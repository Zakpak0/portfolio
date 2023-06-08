import {
    Box,
    BoxProps,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    BreadcrumbSeparator,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
} from '@chakra-ui/react'
import { ChildComponent } from '../../types'
import { useEffect, useMemo, useState } from 'react';
import { Link } from '@chakra-ui/next-js';
export interface NavProps extends ChildComponent {
    fields: [string, string[]][]
}
export const Nav = function ({ dict, fields, mq: { enumX } }: NavProps) {
    const [key, setKey] = useState<string>(fields[0][0]);
    const [path, setPath] = useState<string[]>(fields[0][1]);
    const map = useMemo(() => new Map<string, string[]>(fields), [fields])
    useEffect(() => {
        setPath(map.get(key) || [])
    }, [key, map])
    return (
        <Flex
            border="1px solid black"
            flexDir={enumX<FlexProps["flexDir"]>({ mobile: "column", tablet: "column", web: "column", tv: "column" })}
            minWidth={enumX<FlexProps["width"]>({ mobile: "20%", tablet: "20%", web: "20%", tv: "20%" })}
            maxWidth={enumX<FlexProps["width"]>({ mobile: "max-content", tablet: "max-content", web: "max-content", tv: "max-content" })}
            height={enumX<FlexProps["height"]>({ mobile: "100vh", tablet: "100vh", web: "100vh", tv: "100vh" })}
            alignItems={enumX<FlexProps["alignItems"]>({ mobile: "center", tablet: "center", web: "center", tv: "center" })}
            justifyContent={enumX<FlexProps["justifyContent"]>({ mobile: "flex-start", tablet: "flex-start", web: "flex-start", tv: "flex-start" })}
        >
            {fields.map(([key, value], index) => {
                return (
                    <Box
                        key={index}
                        dir={enumX<BoxProps["dir"]>({ mobile: "column", tablet: "column", web: "column", tv: "column" })}
                        paddingX={enumX<BoxProps["paddingX"]>({ mobile: "4", tablet: "4", web: "4", tv: "4" })}
                    >
                        <Heading>{key}</Heading>
                        {value.map((item, index) => {
                            const segments = item.split("/")
                            return (
                                <Link id={key + value} href={"/cms" + '#' + key + value} key={index} >
                                    <Breadcrumb
                                        spacing={enumX<BreadcrumbProps["spacing"]>({ mobile: "4", tablet: "4", web: "4", tv: "4" })}
                                        separator={<BreadcrumbSeparator> / </BreadcrumbSeparator>}
                                        paddingX={enumX<BreadcrumbProps["paddingX"]>({ mobile: "4", tablet: "4", web: "4", tv: "4" })}
                                        paddingY={enumX<BreadcrumbProps["paddingY"]>({ mobile: "2", tablet: "2", web: "2", tv: "2" })}
                                        color="gray.600"
                                    >
                                        {segments.map(function (segment, index) {
                                            return (
                                                <BreadcrumbItem key={index} >
                                                    <Heading
                                                        as={enumX<HeadingProps["as"]>({ mobile: "h4", tablet: "h4", web: "h4", tv: "h4" })}
                                                        size={enumX<HeadingProps["size"]>({ mobile: "md", tablet: "md", web: "md", tv: "md" })}
                                                    >
                                                        {segment}
                                                    </Heading>
                                                </BreadcrumbItem>)
                                        })

                                        }
                                    </Breadcrumb>
                                </Link>
                            )
                        })}
                    </Box>
                )
            })}
        </Flex>
    )
}

