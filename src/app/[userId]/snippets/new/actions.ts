"use server";

export async function createSnippet(
  value: string | undefined,
  formData: FormData
) {
  const rawFormData = {
    title: formData.get("title"),
    language: formData.get("language"),
  };

  console.log(rawFormData, value);
}
