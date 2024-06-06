'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { onFollow, onUnfollow } from '@/actions/follow'
import { onBlock, onUnBlock } from '@/actions/block'

interface ActionsProps {
	isFollowing: boolean
	isBlock: boolean
	userId: string
}

export const Actions = ({ isFollowing, userId, isBlock }: ActionsProps) => {
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

	const handleBlock = () => {
		startTranstion(() => {
			onBlock(userId)
				.then((data) => {
					toast.success(`Blocked the user ${data.blocked.username}`)
				})
				.catch(() => toast.error('Something went wrong'))
		})
	}

	const handleUnBlock = () => {
		startTranstion(() => {
			onUnBlock(userId)
				.then((data) => {
					toast.success(`Unnlocked the user ${data.blocked.username}`)
				})
				.catch(() => toast.error('Something went wrong'))
		})
	}

	return (
		<>
			<Button disabled={isPending} onClick={onClick} variant="primary">
				{isFollowing ? 'Unfollow' : 'Follow'}
			</Button>
			<Button onClick={handleUnBlock} disabled={isPending}>
				{isBlock ? 'UnBlcok' : 'Block'}
			</Button>
		</>
	)
}
