import {toast} from 'sonner';
import {InferRequestType, InferResponseType} from 'hono';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {client} from '@/lib/rpc';

// 200 means only the success version of response type
type ResponseType = InferResponseType<(typeof client.api.workspaces)[':workspaceId']['$patch'], 200>;

type RequestType = InferRequestType<(typeof client.api.workspaces)[':workspaceId']['$patch']>;

export const useUpdateWorkspace = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({form, param}) => {
			const response = await client.api.workspaces[':workspaceId']['$patch']({form, param});

			if (!response.ok) {
				throw new Error('Failed to create workspace');
			}
			return await response.json();
		},
		onSuccess: ({data}) => {
			toast.success('Workspace Updated');
			queryClient.invalidateQueries({queryKey: ['workspaces']});
			queryClient.invalidateQueries({queryKey: ['workspace', data.$id]});
		},
		onError: () => {
			toast.error('Failed to create workspace');
		},
	});

	return mutation;
};
