'use client'
import { useConnectionState, useRemoteParticipant, useTracks } from '@livekit/components-react'
import { ConnectionState, Track } from 'livekit-client'

import { OfflineVideo } from './offline-video'
import { LoadingVideo } from './loading-video'
import { LiveVideo } from './live-video'

interface VideoProps {
	hostName: string
	hostIdentity: string
}

export const Video = ({ hostName, hostIdentity }: VideoProps) => {
	const connectionsState = useConnectionState()
	const participant = useRemoteParticipant(hostIdentity)
	const tracks = useTracks([Track.Source.Camera, Track.Source.Microphone]).filter(
		(track) => track.participant.identity === hostIdentity
	)

	let content

	if (!participant && connectionsState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo label={connectionsState} />
	} else {
		content = <LiveVideo participant={participant} />
	}

	return <div className="aspect-video border-b group relative">{content}</div>
}
