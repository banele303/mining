'use client';

import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ImagePlus, X, Loader2, Star } from "lucide-react";

type Props = {
  /** Already-uploaded image URLs (Convex storage or external) */
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
};

export default function ImageUploader({ value, onChange, maxFiles = 5 }: Props) {
  const generateUploadUrl = useMutation(api.listings.generateUploadUrl);
  const getStorageUrl = useMutation(api.listings.getStorageUrl);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const remaining = maxFiles - value.length;
    const toUpload = Array.from(files).slice(0, remaining);
    if (toUpload.length === 0) return;

    setUploading(true);
    try {
      const uploadResults = await Promise.all(
        toUpload.map(async (file) => {
          try {
            // 1. Get a short-lived upload URL from Convex
            const uploadUrl = await generateUploadUrl();

            // 2. POST the file bytes directly to Convex storage
            const res = await fetch(uploadUrl, {
              method: "POST",
              headers: { "Content-Type": file.type },
              body: file,
            });
            if (!res.ok) throw new Error("Upload failed");
            const { storageId } = await res.json() as { storageId: string };

            // 3. Resolve the permanent public URL
            const publicUrl = await getStorageUrl({ storageId });
            return publicUrl;
          } catch (e) {
            console.error("Individual file upload failed:", e);
            return null;
          }
        })
      );

      const successful = uploadResults.filter((url): url is string => !!url);
      if (successful.length > 0) {
        onChange([...value, ...successful]);
      }
    } catch (err) {
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = (idx: number) => {
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  };

  const makeFirst = (idx: number) => {
    const next = [...value];
    const [item] = next.splice(idx, 1);
    next.unshift(item);
    onChange(next);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      {/* Drop zone */}
      {value.length < maxFiles && (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
          style={{
            border: `2px dashed ${dragOver ? "#10B981" : "#CBD5E1"}`,
            borderRadius: "12px",
            padding: "2rem 1.5rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragOver ? "rgba(16,185,129,0.04)" : "#FAFAFA",
            transition: "all 0.2s ease",
          }}
        >
          {uploading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "#64748B" }}>
              <Loader2 size={28} color="#10B981" style={{ animation: "spin 1s linear infinite" }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Uploading…</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <div style={{ width: "48px", height: "48px", background: "rgba(16,185,129,0.1)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.25rem" }}>
                <ImagePlus size={22} color="#10B981" />
              </div>
              <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                Click or drag images here
              </p>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                JPG, PNG or WEBP — up to {maxFiles} images. Max 10MB each.
              </p>
              <p style={{ fontSize: "0.72rem", color: "#CBD5E1" }}>
                {value.length}/{maxFiles} uploaded
              </p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            style={{ display: "none" }}
            onChange={(e) => uploadFiles(e.target.files)}
          />
        </div>
      )}

      {/* Preview grid */}
      {value.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: "0.6rem" }}>
          {value.map((url, idx) => (
            <div key={url} style={{ position: "relative", borderRadius: "10px", overflow: "hidden", aspectRatio: "1", border: idx === 0 ? "2px solid #10B981" : "1px solid #E2E8F0", background: "#F1F5F9" }}>
              <img src={url} alt={`image-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

              {/* Cover badge */}
              {idx === 0 && (
                <div style={{ position: "absolute", bottom: "4px", left: "4px", background: "#10B981", color: "#fff", fontSize: "0.6rem", fontWeight: 800, padding: "0.15rem 0.4rem", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Cover
                </div>
              )}

              {/* Actions */}
              <div style={{ position: "absolute", top: "4px", right: "4px", display: "flex", flexDirection: "column", gap: "3px" }}>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.65)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={11} color="#fff" />
                </button>
                {idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeFirst(idx)}
                    title="Set as cover photo"
                    style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.65)", border: "none", borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Star size={10} color="#FCD34D" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
