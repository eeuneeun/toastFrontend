"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  id: number;
  toastName: string;
  price: number;
  desc: string;
  imgUrl: string;
  writeTime: Date;
};

export default function Write({}: ItemContents) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const addItem = async (data: ItemContents) => {
    const res = await fetch("http://localhost:4000/toast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        toastName: data.toastName,
        price: data.price,
        desc: data.desc,
        imgUrl: uploadedUrl,
        writeTime: new Date(),
      }),
    });
    if (res.status == 201) {
      router.push("../toast");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ItemContents>();

  const onSubmit: SubmitHandler<ItemContents> = (data) => {
    console.log(data);
    addItem(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file)); // 로컬 미리보기
    }
  };

  const handleUpload = async (event: Event) => {
    event.preventDefault();
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:4000/toast/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedUrl(`http://localhost:4000${response.data.url}`);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };
  return (
    <div className="write">
      <h2>상품 등록</h2>
      <form action="post" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="toastName">
          상품명
          <input
            type="text"
            id="toastName"
            {...register("toastName", { required: true })}
          />
        </label>
        <label htmlFor="price">
          가격
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
          />
        </label>
        <label htmlFor="desc">
          상품 설명
          <textarea id="desc" {...register("desc", { required: true })} />
        </label>
        <label htmlFor="imgUrl">
          상품 이미지
          <input
            type="file"
            id="imgUrl"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewUrl && (
            <img src={previewUrl} alt="preview" style={{ width: 150 }} />
          )}
          <button onClick={(event) => handleUpload(event)}>Upload</button>
        </label>
        <input type="submit" />
      </form>
      <Link href="../toast">글목록</Link>
    </div>
  );
}
