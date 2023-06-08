'use client';

import { FlexProps, Flex, Textarea } from "@chakra-ui/react";
import { TextEditor } from "components/v1/Cms";
import { Nav } from "components/v1/Cms/Nav";
import { useMQ } from "lib/v1/Theme";
import { useEffect, useRef, useState } from 'react'
export type SSP = {
    fields: [string, string[]][]
}
export const CmsHomePage = function ({ fields }: SSP) {
    const mq = useMQ()
    const { enumX } = mq
    const socket = useRef<WebSocket>()
    useEffect(() => {
        socketInitializer()
        return () => {
            if (!socket.current) return
            socket.current.close()
            socket.current = undefined
        }
    }, [])
    function send(message: Record<string, any>) {
        if (!socket.current) return
        socket.current.send(JSON.stringify(message))
    }
    function receive(message: Record<string, any>) {
        if (!socket.current) return
        try {
            console.log(JSON.parse(message.data))
        } catch (e) {
            console.log(e, message?.data)
        }
    }
    const socketInitializer = async () => {
        const url = new URL('ws://192.168.1.10:5000/websocket')
        url.searchParams.append('room', '1')
        url.searchParams.append('client', '1')
        socket.current = new WebSocket(url)
        if (!socket.current) return
        socket.current.onopen = () => {
            console.log('socket opened')
            if (!socket.current) return
            if (socket.current.readyState === WebSocket.OPEN) {
                console.log('socket ready')
                socket.current.send(JSON.stringify({ type: 'hello' }))
            }
        }
        socket.current.onmessage = (e) => {
            receive(e)
        }
        socket.current.onerror = (e) => {
            console.log(e)
        }
    }
    const dict = {}
    return (
        <Flex
            flexDirection={enumX<FlexProps["flexDirection"]>({ mobile: "row", tablet: "row", web: "row", tv: "row" })}
        >
            <Textarea
                onChange={(e) => {
                    if (!socket) return
                    send({ type: e.target.value })
                }
                } />
            <Nav
                {...{ dict, fields, mq }}
            />
            <Flex
                flex={enumX<FlexProps["flex"]>({ mobile: "1", tablet: "1", web: "1", tv: "1" })}
                alignItems={enumX<FlexProps["alignItems"]>({ mobile: "flex-end", tablet: "flex-end", web: "flex-end", tv: "flex-end" })}
            >

                <TextEditor {...{ dict, mq, }} />
            </Flex>
        </Flex>

    )
}