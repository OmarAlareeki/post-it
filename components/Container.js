import React from 'react';
import { Flex } from '@chakra-ui/core';

export default function Container({ children }) {
    return (
        <>
            <Flex>
                {children}
            </Flex>
        </>
    );
}