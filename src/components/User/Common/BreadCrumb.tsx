import { ReactNode } from 'react';

// Interface cho các item của breadcrumb, có thêm prop `icon`
interface BreadCrumbItem {
    label: string;
    href: string;
    icon?: ReactNode;  // Prop cho phép truyền icon vào
}

// Props của BreadCrumb chứa một mảng các item
interface BreadCrumbProps {
    items: BreadCrumbItem[];
}

export default function BreadCrumb({ items }: BreadCrumbProps) {
    return (
        <div className="my-6">
            <nav className="inline md:flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {items.map((item, index) => (
                        <li key={index} className="inline-flex items-center">
                            <div className="flex items-center">
                                <a href={item.href} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-white dark:text-gray-400 dark:hover:text-white">
                                    {item.icon && (
                                        <span className="me-2.5 text-white"> {/* Thêm màu cho icon */}
                                            {item.icon}
                                        </span>
                                    )}
                                    {item.label}
                                </a>
                                {index !== items.length - 1 && (
                                    <svg className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}
