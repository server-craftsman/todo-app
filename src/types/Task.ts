export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'New' | 'In Progress' | 'Complete';
    tags: string[];
    startDate: Date;
    endDate: Date;
    subtasks: Task[];
    progress: number;
}