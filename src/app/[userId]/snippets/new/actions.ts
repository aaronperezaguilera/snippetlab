"use server";

export async function createSnippet(formData: FormData) {
  const rawFormData = {
    title: formData.get("title"),
    language: formData.get("language"),
  };

  console.log(rawFormData);
}
