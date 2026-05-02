import { FileText, BarChart3, FileType2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import type {
    ExportOption, ReportRow, ReportStat, ReportType,
} from '../api/types/report';

export interface UseReportsReturn {
    stats: ReportStat[];
    reports: ReportRow[];
    filteredReports: ReportRow[];
    exportOptions: ExportOption[];
    typeBadgeStyles: Record<ReportType, string>;
    fieldOptions: string[];
    typeOptions: string[];
    dateOptions: string[];

    searchQuery: string;
    selectedField: string;
    selectedType: string;
    selectedDate: string;

    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleFieldChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    handleDateChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const stats: ReportStat[] = [
    { label: 'Total Reports', value: '24', change: '+6 this month', icon: BarChart3 },
    { label: 'Fields Analyzed', value: '6', change: 'All active', icon: BarChart3 },
    { label: 'AI Recommendations', value: '18', change: '+4 pending', icon: BarChart3 },
    { label: 'PDF Downloads', value: '42', change: '+12 this week', icon: BarChart3 },
];

const reports: ReportRow[] = [
    { name: 'Wheat Field - March Analysis', field: 'North Field', type: 'Crop Analysis', date: 'Mar 24, 2026', size: '2.4 MB', status: 'Completed' },
    { name: 'Disease Risk Assessment - South Valley', field: 'South Valley', type: 'Disease Risk', date: 'Mar 22, 2026', size: '1.8 MB', status: 'Completed' },
    { name: 'Fertilizer Recommendations - All Fields', field: 'Multiple Fields', type: 'Fertilizer', date: 'Mar 20, 2026', size: '3.2 MB', status: 'Completed' },
    { name: 'Weather Impact Report - Q1 2026', field: 'All Fields', type: 'Weather Analysis', date: 'Mar 15, 2026', size: '4.1 MB', status: 'Completed' },
    { name: 'East Garden - Pepper Crop Health', field: 'East Garden', type: 'Crop Analysis', date: 'Mar 10, 2026', size: '2.1 MB', status: 'Completed' },
    { name: 'Irrigation Optimization Report', field: 'North Field', type: 'Irrigation', date: 'Mar 8, 2026', size: '1.5 MB', status: 'Completed' },
];

const exportOptions: ExportOption[] = [
    {
        title: 'Export as PDF',
        description: 'Download detailed reports in PDF format with charts and analysis',
        buttonLabel: 'Download PDF',
        primary: true,
        icon: FileText,
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
    },
    {
        title: 'Export as CSV',
        description: 'Export raw data in CSV format for further analysis',
        buttonLabel: 'Download CSV',
        primary: false,
        icon: FileType2,
        iconBg: 'bg-green-50',
        iconColor: 'text-green-600',
    },
    {
        title: 'Analytics Dashboard',
        description: 'View comprehensive analytics and trends across all fields',
        buttonLabel: 'View Dashboard',
        primary: false,
        icon: BarChart3,
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
];

const typeBadgeStyles: Record<ReportType, string> = {
    'Crop Analysis': 'bg-green-50 text-green-700',
    'Disease Risk': 'bg-orange-50 text-orange-600',
    Fertilizer: 'bg-amber-50 text-amber-700',
    'Weather Analysis': 'bg-blue-50 text-blue-600',
    Irrigation: 'bg-cyan-50 text-cyan-700',
};

const fieldOptions: string[] = ['All Fields', 'North Field', 'South Valley', 'East Garden', 'Multiple Fields'];
const typeOptions: string[] = ['All Types', 'Crop Analysis', 'Disease Risk', 'Fertilizer', 'Weather Analysis', 'Irrigation'];
const dateOptions: string[] = ['Last 30 days', 'Last 7 days', 'Last 90 days', 'This year'];

export function useReports(): UseReportsReturn {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedField, setSelectedField] = useState<string>(fieldOptions[0]);
    const [selectedType, setSelectedType] = useState<string>(typeOptions[0]);
    const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0]);

    const filteredReports = useMemo(() => {
        return reports.filter((r) => {
            const matchesSearch = searchQuery.trim() === ''
                || r.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesField = selectedField === 'All Fields' || r.field === selectedField;
            const matchesType = selectedType === 'All Types' || r.type === selectedType;
            return matchesSearch && matchesField && matchesType;
        });
    }, [searchQuery, selectedField, selectedType]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(e.target.value);
    };

    const handleFieldChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedField(e.target.value);
    };

    const handleTypeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedType(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setSelectedDate(e.target.value);
    };

    return {
        stats,
        reports,
        filteredReports,
        exportOptions,
        typeBadgeStyles,
        fieldOptions,
        typeOptions,
        dateOptions,
        searchQuery,
        selectedField,
        selectedType,
        selectedDate,
        handleSearchChange,
        handleFieldChange,
        handleTypeChange,
        handleDateChange,
    };
}
