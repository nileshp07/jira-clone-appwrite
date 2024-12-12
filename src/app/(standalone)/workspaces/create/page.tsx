import {redirect} from 'next/navigation';
import {getCurrent} from '@/features/auth/queries';
import {CreateWorkspaceForm} from '@/features/workspaces/components/create-workspace-form';

async function WorkspaceCreatePage() {
	const user = await getCurrent();

	if (!user) {
		redirect('/sign-in');
	}

	return (
		<div className='w-full lg:max-w-xl'>
			<CreateWorkspaceForm />
		</div>
	);
}

export default WorkspaceCreatePage;
