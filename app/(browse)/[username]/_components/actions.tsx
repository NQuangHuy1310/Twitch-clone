'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { onFollow, onUnfollow } from '@/actions/follow'

interface ActionsProps {
	isFollowing: boolean
	userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
	const [isPending, startTranstion] = useTransition()

	const handleFollow = () => {
		startTranstion(() => {
			onFollow(userId)
				.then((data) => {
					toast.success(`You are now following ${data.following.username}`)
				})
				.catch(() => toast.error('Somethong went wrong'))
		})
	}

	const handleUnFollow = () => {
		startTranstion(() => {
			onUnfollow(userId)
				.then((data) => {
					toast.success(`You have unfollowed ${data.following.username}`)
				})
				.catch(() => toast.error('Somethong went wrong'))
		})
	}

	const onClick = () => {
		if (isFollowing) {
			handleUnFollow()
		} else {
			handleFollow()
		}
	}

	return (
		<Button disabled={isPending} onClick={onClick} variant="primary">
			{isFollowing ? 'Unfollow' : 'Follow'}
		</Button>
	)
}
