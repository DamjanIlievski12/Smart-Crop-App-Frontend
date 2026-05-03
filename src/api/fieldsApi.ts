import axiosInstance from "../axios/axios";
import type {
  CreateFieldResponse,
  DeleteFieldResponse,
  Field,
  FieldPayload,
  GetFieldResponse,
  GetFieldsResponse,
  ImportFieldsResponse,
  UpdateFieldResponse,
} from "./types/field";

export async function apiGetFields(): Promise<GetFieldsResponse> {
  const { data } = await axiosInstance.get<GetFieldsResponse>("/fields/");
  return data;
}

export async function apiGetField(id: number): Promise<GetFieldResponse> {
  const { data } = await axiosInstance.get<GetFieldResponse>(`/fields/${id}/`);
  return data;
}

export async function apiCreateField(
  payload: FieldPayload,
): Promise<CreateFieldResponse> {
  const { data } = await axiosInstance.post<CreateFieldResponse>(
    "/fields/",
    payload,
  );
  return data;
}

export async function apiUpdateField(
  id: number,
  payload: Partial<FieldPayload>,
): Promise<UpdateFieldResponse> {
  const { data } = await axiosInstance.put<UpdateFieldResponse>(
    `/fields/${id}`,
    payload,
  );
  return data;
}

export async function apiDeleteField(id: number): Promise<DeleteFieldResponse> {
  const { data } = await axiosInstance.delete(`/fields/${id}/`);
  return data;
}

// POST upload CSV
export async function apiImportFieldsCsv(
  file: File,
): Promise<ImportFieldsResponse> {
  const form = new FormData();
  form.append("file", file);

  const { data } = await axiosInstance.post<ImportFieldsResponse>(
    "/fields/upload",
    form,
  );

  return data;
}
