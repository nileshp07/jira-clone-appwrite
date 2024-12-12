'use client';

import {DottedSeparator} from '@/components/dotted-separator';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';
import {useJoinWorkspace} from '../api/user-join-workspace';
import {useInviteCode} from '../hooks/use-invite-code';
import {useWorkspaceId} from '../hooks/use-workspaceId';
import {useRouter} from 'next/navigation';

interface JoinWorkspaceFromProps {
	initialValues: {
		name: string;
	};
}

export const JoinWorkspaceForm = ({initialValues}: JoinWorkspaceFromProps) => {
	const router = useRouter();

	const workspaceId = useWorkspaceId();
	const inviteCode = useInviteCode();
	const {mutate, isPending} = useJoinWorkspace();

	const onSubmit = () => {
		mutate(
			{
				param: {workspaceId},
				json: {code: inviteCode},
			},
			{
				onSuccess: ({data}) => {
					router.push(`/workspaces/${data.$id}`);
				},
			}
		);
	};

	return (
		<Card className='w-full h-full border-none shadow-none '>
			<CardHeader className='p-7'>
				<CardTitle className='text-xl font-bold '>Join Workspace</CardTitle>
				<CardDescription>
					You&apos;ve been invited to join <strong>{initialValues.name}</strong> workspace
				</CardDescription>
				<div className='px-7 '>
					<DottedSeparator />
				</div>
				<CardContent className='p-7'>
					<div className='flex flex-col lg:flex-row  gap-y-2 gap-x-2 items-center justify-between'>
						<Button
							className='w-full lg:w-fit'
							size={'lg'}
							variant={'secondary'}
							type='button'
							asChild
							disabled={isPending}
						>
							<Link href={'/'}>Cancel</Link>
						</Button>
						<Button className='w-full lg:w-fit' size={'lg'} type='button' onClick={onSubmit} disabled={isPending}>
							Join Workspace
						</Button>
					</div>
				</CardContent>
			</CardHeader>
		</Card>
	);
};
