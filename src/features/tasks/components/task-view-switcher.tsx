'use client';

import {useCallback} from 'react';
import {useQueryState} from 'nuqs';
import {Loader2, PlusIcon} from 'lucide-react';

import {DottedSeparator} from '@/components/dotted-separator';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useWorkspaceId} from '@/features/workspaces/hooks/use-workspaceId';
import {useProjectId} from '@/features/projects/hooks/use-projectId';

import {TaskStatus} from '../types';
import {useTaskFilters} from '../hooks/use-task-filters';
import {useCreateTaskModal} from '../hooks/use-create-task-modal';
import {useGetTasks} from '../api/use-get-tasks';
import {useBlukUpdateTasks} from '../api/use-bulk-update-tasks';

import {DataFilters} from './data-filters';
import {DataTable} from './data-table';
import {columns} from './columns';
import {DataKanban} from './data-kanban';
import {DataCalendar} from './data-calendar';

interface TaskViewSwitcherProps {
	hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({hideProjectFilter}: TaskViewSwitcherProps) => {
	const workspaceId = useWorkspaceId();
	const paramProjectId = useProjectId();

	const {open} = useCreateTaskModal();

	const {mutate: bulkUpdate} = useBlukUpdateTasks();

	const [view, setView] = useQueryState('task-view', {
		defaultValue: 'table',
	});

	const [{status, assigneeId, projectId, dueDate}] = useTaskFilters();

	const {data: tasks, isLoading: isLoadingTasks} = useGetTasks({
		workspaceId,
		projectId: paramProjectId || projectId,
		assigneeId,
		status,
		dueDate,
	});

	const onKanbanChange = useCallback(
		(
			tasks: {
				$id: string;
				status: TaskStatus;
				position: number;
			}[]
		) => {
			bulkUpdate({
				json: {tasks},
			});
		},
		[bulkUpdate]
	);

	return (
		<Tabs defaultValue={view} onValueChange={setView} className='flex-1 w-full border rounded-lg'>
			<div className='h-full flex flex-col overflow-auto p-4'>
				<div className='flex flex-col gap-y-2 lg:flex-row justify-between items-center'>
					<TabsList className='w-full lg:w-auto'>
						<TabsTrigger className='h-8 w-full lg:w-auto' value='table'>
							Table
						</TabsTrigger>
						<TabsTrigger className='h-8 w-full lg:w-auto' value='kanban'>
							Kanban
						</TabsTrigger>
						<TabsTrigger className='h-8 w-full lg:w-auto' value='calender'>
							Calender
						</TabsTrigger>
					</TabsList>
					<Button size={'sm'} className='w-full lg:w-auto' onClick={open}>
						<PlusIcon className='size-4 mr-2' />
						New
					</Button>
				</div>
				<DottedSeparator className='my-4' />
				<DataFilters hideProjectFilter={hideProjectFilter} />
				<DottedSeparator className='my-4' />
				{isLoadingTasks ? (
					<div className='w-full border rounded-lg h-[200px] flex flex-col items-center justify-center'>
						<Loader2 className='size-5 animate-spin text-muted-foreground' />
					</div>
				) : (
					<>
						<TabsContent value='table' className='mt-0'>
							<DataTable columns={columns} data={tasks?.documents ?? []} />
						</TabsContent>
						<TabsContent value='kanban' className='mt-0'>
							<DataKanban data={tasks?.documents ?? []} onChange={onKanbanChange} />
						</TabsContent>
						<TabsContent value='calender' className='mt- h-full pb-4'>
							<DataCalendar data={tasks?.documents ?? []} />
						</TabsContent>
					</>
				)}
			</div>
		</Tabs>
	);
};
