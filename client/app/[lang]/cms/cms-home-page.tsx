'use client';

import { FlexProps, Flex } from "@chakra-ui/react";
import { TextEditor } from "components/v1/Cms";
import { Nav } from "components/v1/Cms/Nav";
import { useMQ } from "lib/v1/Theme";
import { useEffect } from 'react'
let socket: WebSocket
export type SSP = {
    fields: [string, string[]][]
}
export const CmsHomePage = function ({ fields }: SSP) {
    const mq = useMQ()
    const { enumX } = mq
    useEffect(() => {
        socketInitializer()
        return () => {
            if (!socket) return
            socket.close()
        }
    }, [])

    const socketInitializer = async () => {
        const url = new URL('ws://192.168.1.16:5000/websocket')
        url.searchParams.append('room', '1')
        url.searchParams.append('client', '1')
        socket = new WebSocket(url)
        if (!socket) return
        socket.onopen = () => {
            console.log('socket opened')
            socket.send('hello')
        }
    }
    const dict = {}
    return (
        <Flex
            flexDirection={enumX<FlexProps["flexDirection"]>({ mobile: "row", tablet: "row", web: "row", tv: "row" })}
        >
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