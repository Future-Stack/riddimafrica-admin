"use client";

import CommonButton from "@/app/components/common/button/CommonButton";
import CommonHeader from "@/app/components/common/header/CommonHeader";
import {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "@/store/features/profile/profileAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CheckSquare, User } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const inputClassName =
  "w-full rounded-lg border border-[#C4CDD5] bg-[#E8EEF2] px-4 py-3 text-sm text-[#101828] outline-none focus:ring-2 focus:ring-[#E6A40033]";

const labelClassName = "block text-sm font-medium text-[#3D2513] mb-2";

const phoneRegex = /^\+?[0-9]{7,15}$/;

const profileFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => value === "" || phoneRegex.test(value), {
      message: "Enter a valid phone number",
    }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const DEFAULT_VALUES: ProfileFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
};

export const ProfilePanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("/Ellipse 6.svg");
  const [imageError, setImageError] = useState("");

  const { data, isLoading } = useGetAdminProfileQuery();
  const [updateProfile] = useUpdateAdminProfileMutation();
  const profile = data?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!profile) return;

    reset({
      name: profile.name ?? "",
      email: profile.email ?? "",
      phoneNumber: profile.phoneNumber ?? "",
    });
    setImagePreview(profile.profileImage || "/Ellipse 6.svg");
    setImageFile(null);
    setImageError("");
  }, [profile, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    setImageError("");
    setImageFile(file);
    setImagePreview((current) => {
      if (current.startsWith("blob:")) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateProfile({
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        ...(imageFile ? { profileImage: imageFile } : {}),
      }).unwrap();
      setImageFile(null);
    } catch {
      // The API layer already shows the error toast.
    }
  };

  return (
    <div className="bg-[#FAF7F3] rounded-2xl border border-[#C4CDD566] p-5 md:p-6">
      <div className="flex items-start gap-3 mb-6">
        <span className="w-9 h-9 rounded-lg bg-[#E6A400] text-white flex items-center justify-center shrink-0">
          <User size={18} />
        </span>
        <div>
          <CommonHeader size="lg" className="text-[#101828]!">
            Profile
          </CommonHeader>
          <CommonHeader size="xs" className="text-[#624D3B]!">
            Update your admin name, contact details, and photo.
          </CommonHeader>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative h-20 w-20 rounded-full overflow-hidden shrink-0 cursor-pointer group"
            aria-label="Change profile photo"
          >
            <img
              src={imagePreview}
              alt={profile?.name || "Admin"}
              className="h-full w-full object-cover"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "Admin")}&background=0a192f&color=fff`;
              }}
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={18} className="text-white" />
            </span>
          </button>
          <div>
            <p className="text-sm font-medium text-[#101828]">Profile photo</p>
            <p className="text-xs text-[#787A7F] mb-2">
              JPG, PNG, or WEBP. Click the photo to change it.
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-[#AB6331] cursor-pointer hover:underline"
            >
              Upload photo
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {imageError && <p className="text-xs text-red-500">{imageError}</p>}

        <div>
          <label htmlFor="profile-name" className={labelClassName}>
            Name
          </label>
          <input
            id="profile-name"
            {...register("name")}
            className={inputClassName}
            placeholder="John Doe"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="profile-email" className={labelClassName}>
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            {...register("email")}
            className={inputClassName}
            placeholder="admin@example.com"
            disabled={isLoading}
            readOnly
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="profile-phone" className={labelClassName}>
            Phone number
          </label>
          <input
            id="profile-phone"
            {...register("phoneNumber")}
            className={inputClassName}
            placeholder="01775907562"
            disabled={isLoading}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className={labelClassName}>Role</label>
          <input
            value={profile?.role?.replace(/_/g, " ") ?? ""}
            className={inputClassName}
            disabled
            readOnly
          />
        </div>

        <CommonButton
          type="submit"
          size="sm"
          variant="primary"
          shape="rounded"
          leftIcon={<CheckSquare size={16} />}
          className="mt-6"
          isLoading={isSubmitting}
          loadingText="Saving..."
          disabled={isLoading || (!isDirty && !imageFile)}
        >
          Save Changes
        </CommonButton>
      </form>
    </div>
  );
};
