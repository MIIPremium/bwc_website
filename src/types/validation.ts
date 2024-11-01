import { z } from "zod";

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const MAX_FILES = 10;

export const addReferenceSchema = z.object({
  ar_title: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من ارربع أحرف" })
    .max(19, { message: "لا يمكنك إرسال أكثر من 19 حرفًا" }),
  en_title: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من ارربع أحرف" })
    .max(19, { message: "لا يمكنك إرسال أكثر من 19 حرفًا" }),
  link: z.string({ message: "مطلوب " }).max(1000),
});
export const addServicesSchema = z.object({
  ar_name: z
    .string({ required_error: "مطلوب" })
    .min(3, { message: "لا يمكن أن يكون أقل من ثلاثة أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  en_name: z
    .string({ required_error: "مطلوب" })
    .min(3, { message: "لا يمكن أن يكون أقل من ثلاثة أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  ar_Description: z.string({ message: "مطلوب " }).max(1000),
  en_Description: z.string({ message: "مطلوب " }).max(1000),
});
export const addReportSchema = z.object({
  Ar_Title: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_Title: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" }),
  Img: z.string({ message: "مطلوب " }).max(1000),
  Ar_description: z.string({ message: "مطلوب " }).max(1000),
  En_description: z.string({ message: "مطلوب " }).max(1000),
  Ar_executive_summary: z.string({ message: "مطلوب " }).max(1000),
  En_executive_summary: z.string({ message: "مطلوب " }).max(1000),
  Ar_table_of_content: z.string({ message: "مطلوب " }).max(1000),
  Er_table_of_content: z.string({ message: "مطلوب " }).max(1000),
  date_of_report: z.string({ message: "مطلوب " }).max(1000),
  date_of_publish: z.string({ message: "مطلوب " }).max(1000),
  PdfImg: z.string({ message: "مطلوب " }).max(1000),
  pdf_link: z.string({ message: "مطلوب " }).max(1000),
  An_note: z.string({ message: "مطلوب " }).max(1000),
  En_note: z.string({ message: "مطلوب " }).max(1000),
});
export const addJobSchema = z.object({
  Ar_jobTitle: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_jobTitle: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  avaliable: z.boolean(),
  publish: z.boolean(),
  Ar_skiles: z.array(z.string({ message: "مطلوب " })).optional(),
  En_skiles: z.array(z.string({ message: "مطلوب " })).optional(),
  Ar_advances: z.array(z.string({ message: "مطلوب " })).optional(),
  En_advances: z.array(z.string({ message: "مطلوب " })).optional(),
  Ar_basicDescription: z.string({ message: "مطلوب " }).max(1000),
  En_basicDescription: z.string({ message: "مطلوب " }).max(1000),
  formLink: z.string({ message: "مطلوب " }).max(1000),
  endDate: z.string(),
});
export const updateJobSchema = z.object({
  Ar_jobTitle: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_jobTitle: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  avaliable: z.boolean(),
  publish: z.boolean(),
  Ar_skiles: z.array(z.string({ message: "مطلوب " })).optional(),
  En_skiles: z.array(z.string({ message: "مطلوب " })).optional(),
  Ar_advances: z.array(z.string({ message: "مطلوب " })).optional(),
  En_advances: z.array(z.string({ message: "مطلوب " })).optional(),
  Ar_basicDescription: z.string({ message: "مطلوب " }).max(1000),
  En_basicDescription: z.string({ message: "مطلوب " }).max(1000),
  formLink: z.string({ message: "مطلوب " }).max(1000),
  endDate: z.string(),
});
export const addTaskForceSchema = z.object({
  Ar_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من ارربع أحرف" })
    .max(19, { message: "لا يمكنك إرسال أكثر من 19 حرفًا" }),
  En_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من ارربع أحرف" }),
  Ar_degree: z
    .string({ required_error: "مطلوب" })
    .min(5, { message: "لا يمكن أن يكون أقل من خمس أحرف" })
    .max(19, { message: "لا يمكنك إرسال أكثر من 19 حرفًا" }),
  En_degree: z
    .string({ required_error: "مطلوب" })
    .min(5, { message: "لا يمكن أن يكون أقل من خمس أحرف" }),
  Ar_role: z
    .string({ required_error: "مطلوب" })
    .min(5, { message: "لا يمكن أن يكون أقل من خمس أحرف" })
    .max(19, { message: "لا يمكنك إرسال أكثر من 19 حرفًا" }),
  En_role: z
    .string({ required_error: "مطلوب" })
    .min(5, { message: "لا يمكن أن يكون أقل من خمس أحرف" }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
});

export const addOrgSchema = z.object({
  Ar_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" }),
  Link: z.string({ message: "مطلوب " }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
});
export const updateOrgSchema = z.object({
  Ar_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_name: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" }),
  Link: z.string({ message: "مطلوب " }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
});
export const addWriterSchema = z.object({
  Ar_fullName: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_fullName: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  Ar_description: z
    .string({ message: "مطلوب " })
    .nonempty("Arabic description is required"),
  En_description: z
    .string({ message: "مطلوب " })
    .nonempty("English description is required"),
  Ar_role: z.string({ message: "مطلوب " }).nonempty("Arabic role is required"),
  En_role: z.string({ message: "مطلوب " }).nonempty("English role is required"),
  Soicalmedia: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().min(10, "URL should be at least 10 characters long"),
      })
    )
    .optional(),
});
export const UpdateWriterSchema = z.object({
  Ar_fullName: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  En_fullName: z
    .string({ required_error: "مطلوب" })
    .min(4, { message: "لا يمكن أن يكون أقل من 4 أحرف" })
    .max(20, { message: "لا يمكنك إرسال أكثر من 20 حرفًا" }),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  Ar_description: z
    .string({ message: "مطلوب " })
    .nonempty("Arabic description is required"),
  En_description: z
    .string({ message: "مطلوب " })
    .nonempty("English description is required"),
  Ar_role: z.string({ message: "مطلوب " }).nonempty("Arabic role is required"),
  En_role: z.string({ message: "مطلوب " }).nonempty("English role is required"),
});

export const addPublishes = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only accepted image types are allowed"
    )
    .optional(),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  Ar_Note: z.string(),
  En_note: z.string(),
  tags: z.array(z.string()),
  t2read: z.string(),
  writersIdes: z.array(z.number()),
  referencesIdes: z.array(z.number()),
});

export const updatePublishes = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only accepted image types are allowed"
    )
    .optional(),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  Ar_Note: z.string(),
  En_note: z.string(),
  tags: z.array(z.string()),
  t2read: z.string(),
  writersIdes: z.array(z.number()),
  referencesIdes: z.array(z.number()),
});
export const addNews = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only accepted image types are allowed"
    )
    .optional(),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  tags: z.array(z.string()),
  t2read: z.string(),
});

export const updateNews = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only accepted image types are allowed"
    )
    .optional(),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  tags: z.array(z.string()),
  t2read: z.string(),
});
export const addAnalysis = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  Ar_note: z.string(),
  En_note: z.string(),
  ar_table_of_content: z.array(z.string()),
  en_table_of_content: z.array(z.string()),
  tags: z.array(z.string()),
  t2read: z.string(),
  writersIdes: z.array(z.number()),
  referencesIdes: z.array(z.number()),
});

export const updateAnalysis = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  ImageFile: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  date_of_publish: z.string(),
  Ar_description: z.string(),
  En_description: z.string(),
  Ar_note: z.string(),
  En_note: z.string(),
  ar_table_of_content: z.array(z.string()),
  en_table_of_content: z.array(z.string()),
  tags: z.array(z.string()),
  t2read: z.string(),
  writersIdes: z.array(z.number()),
  referencesIdes: z.array(z.number()),
});

export const addReportsScheme = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  Img: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),

  Ar_description: z.string(),
  En_description: z.string(),
  Ar_executive_summary: z.string(),
  En_executive_summary: z.string(),
  Ar_table_of_content: z.array(z.string()),
  En_table_of_content: z.array(z.string()),
  date_of_report: z.string(),
  date_of_publish: z.string(),
  pdfImg: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    }),
  pdfFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000,
      "حجم الملف يجب ألا يتجاوز 5MB"
    )
    .refine(
      (file) => !file || file.name.endsWith(".pdf"),
      "يجب أن تكون صيغة الملف PDF"
    ),
  An_note: z.string(),
  En_note: z.string(),
});

export const updateReportsScheme = z.object({
  Ar_Title: z.string(),
  En_Title: z.string(),
  Img: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),

  Ar_description: z.string(),
  En_description: z.string(),
  Ar_executive_summary: z.string(),
  En_executive_summary: z.string(),
  Ar_table_of_content: z.array(z.string()),
  En_table_of_content: z.array(z.string()),
  date_of_report: z.string(),
  date_of_publish: z.string(),
  pdfImg: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, {
      message: "You must upload one file.",
    })
    .refine((files) => files[0].size <= MAX_FILE_SIZE, {
      message: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
    })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "Only JPEG, JPG, PNG, and WEBP files are accepted.",
    })
    .optional(),
  pdfFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5000000,
      "حجم الملف يجب ألا يتجاوز 5MB"
    )
    .refine(
      (file) => !file || file.name.endsWith(".pdf"),
      "يجب أن تكون صيغة الملف PDF"
    )
    .optional(),
  An_note: z.string(),
  En_note: z.string(),
});
export type ReferenceResp = {
  id: number;
  ar_title: string;
  en_title: string;
  link: string;
};
export type TaskForceRespTable = {
  id: number;
  ar_name: string;
  en_name: string;
  ar_degree: string;
  en_degree: string;
  ar_role: string;
  en_role: string;
  img: string;
};

export interface WriterResp {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: any[];
  soicalmedia: Soicalmedia[];
}

export interface Writer {
  id: number;
  ar_fullName: string;
  en_fullName: string;
  image: string;
  ar_description: string;
  en_description: string;
  ar_role: string;
  en_role: string;
  publication: any[];
  soicalmedia: Array<Soicalmedia | null>;
}

export interface Soicalmedia {
  id: number;
  name: string;
  url: string;
  writerId: number;
  writer: Writer | null;
}
export type publishes = {
  id: number;
  type: string;
  ar_Title: string;
  en_Title: string;
  b_image: string;
  images: string[];
  writers: Writer[];
  reportId: null;
  report: null;
  publish: boolean;
  t2read: number;
  tags: string[] | null;
  date_of_publish: Date;
  ar_table_of_content: null;
  en_table_of_content: null;
  ar_description: string;
  en_description: string;
  ar_Note: null;
  en_Note: string;
  references: any[];
};
export type TaskForceResp = {
  id: number;
  ar_name: string;
  en_name: string;
  ar_degree: string;
  en_degree: string;
  ar_role: string;
  en_role: string;
  img: string;
};
export type OgResp = {
  id: number;
  name: string;
  img: string;
  link: string;
};

export interface ServicesHomeProp {
  ar_name: string;
  en_name: string;
  ar_Description: string;
  en_Description: string;
}
export interface ProfileResp {
  FormFile: File;
  name: string;
}

export type ServicesHomeResp = ServicesHomeProp[];
