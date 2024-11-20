export default function MangaTag({status} : {status: number | undefined}) {
    switch(status) {
        case 1: {
            return (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    Đang phát hành
                </span>
            )
        }
        case 2: {
            return (
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Hoàn thành
                </span>
            )
        }
        case 3: {
            return (
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Chưa phát hành
                </span>
            )
        }
        default:
            return <></>
    }
}