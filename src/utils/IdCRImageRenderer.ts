const PUBLIC_ID_ARRAY = [
    "img_reachout_thumb_ik1kfc",
    "img_learnlanguage_thumb_zoz4bf",
    "img_graduation_thumb_qd1k0l",
    "img_code_thumb_n5a99y",
    "img_breakfast_thumb_p2kflp",
    "img_bookclub_thumb_lfjmxq",
    "img_backtoschool_thumb_iz1xzw",
    "Honors_thumb_p6fkqa",
    "img_read_thumb_c6nivt"
]

export const getClassroomPublicId = (
  classId?: string | number | null,
  defaultPublicId?: string | null
): string => {
  // 1. Ưu tiên lấy publicId nếu database có lưu riêng cho lớp đó
  if (defaultPublicId && defaultPublicId.trim() !== '') {
    return defaultPublicId;
  }

  // 2. Nếu không truyền classId, trả về phần tử đầu tiên
  if (classId === undefined || classId === null || classId === '') {
    return PUBLIC_ID_ARRAY[0];
  }

  // 3. Chuyển classId thành chuỗi
  const strId = String(classId);

  // 4. Thuật toán Hash chuỗi (Java String.hashCode)
  let hash = 0;
  for (let i = 0; i < strId.length; i++) {
    const charCode = strId.charCodeAt(i);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // Chuyển về số nguyên 32-bit
  }

  // 5. Lấy giá trị tuyệt đối và tính phần dư dựa trên độ dài mảng
  const index = Math.abs(hash) % PUBLIC_ID_ARRAY.length;

  return PUBLIC_ID_ARRAY[index];
};