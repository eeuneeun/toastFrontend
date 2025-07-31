"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ItemContents = {
  id: number;
  category: string;
  name: string;
  price: number;
  desc: string;
  imgUrl: string;
  create_at: Date;
};

export default function Write({}: ItemContents) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const addItem = async (data: ItemContents) => {
    const res = await fetch("http://localhost:4000/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: data.category,
        name: data.name,
        price: data.price,
        desc: data.desc,
        imgUrl: uploadedUrl,
        create_at: new Date(),
      }),
    });
    if (res.status == 201) {
      router.push("../menu");
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
        "http://localhost:4000/menu/upload",
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
        <label htmlFor="category">
          카테고리
          <input
            type="text"
            id="category"
            {...register("category", { required: true })}
          />
        </label>
        <label htmlFor="name">
          상품명
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
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
      <Link href="../menu">글목록</Link>
    </div>
  );
}
