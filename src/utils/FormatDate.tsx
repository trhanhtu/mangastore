export function formatISODate(isoString: any): string {
    if(isoString) {
        const date = new Date(isoString);

        // Kiểm tra xem ngày có hợp lệ không
        if (isNaN(date.getTime())) {
            throw new Error("Invalid date string");
        }

        // Lấy các thành phần của ngày
        const day = String(date.getDate()).padStart(2, '0'); // Ngày
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng (tháng bắt đầu từ 0)
        const year = date.getFullYear(); // Năm

        // Trả về định dạng ngày/tháng/năm
        return `${day}/${month}/${year}`;
    }
    return ''
}