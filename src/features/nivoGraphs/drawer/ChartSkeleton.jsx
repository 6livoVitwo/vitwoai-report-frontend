import { Badge, Box, Button, HStack, Skeleton, SkeletonCircle, Spinner, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const ChartSkeleton = () => {
    return (
        <Box
            width={{
                base: "100%",
                lg: "49%",
            }}
            mb={6}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "15px",
                    my: 2.5,
                    borderRadius: "8px",
                    transition: "box-shadow 0.3s ease-in-out",
                    border: "1px solid #dee2e6",
                    "&:hover": {
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
                    },
                }}
                mb={3}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={8}
                >
                    <Box
                        style={{
                            padding: "10px",
                            fontWeight: 600,
                            color: "black",
                        }}
                    >
                        <Skeleton height="6" width="190px" loading={true}>
                            <Text>Chakra UI is cool</Text>
                        </Skeleton>
                        <Text
                            sx={{
                                color: "#718296",
                                fontSize: "10px",
                                mt: 2,
                            }}
                        >
                            <Skeleton height="2" loading={true}>
                                <Text>Chakra UI is cool</Text>
                            </Skeleton>
                        </Text>
                    </Box>
                    <Box
                        style={{
                            padding: "10px",
                            fontWeight: 600,
                            color: "black",
                        }}
                    >
                        <Button p={0} height={"auto"} mr={3} mt={1}>
                            <Skeleton asChild loading={true} height={12}>
                                <Badge>Select</Badge>
                            </Skeleton>
                        </Button>

                        <Button p={0} height={"auto"} mr={3} mt={1}>
                            <Skeleton asChild loading={true} height={12}>
                                <Badge>Select</Badge>
                            </Skeleton>
                        </Button>

                        <Button p={0} height={"auto"} mr={3} mt={1}>
                            <Skeleton asChild loading={true} height={12}>
                                <Badge>Select</Badge>
                            </Skeleton>
                        </Button>

                        <Button
                            mr={3}
                            height={12}
                            mt={1}
                        >
                            <Spinner color="teal.500" size="sm" />
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ ml: 5 }}>
                    <Stack gap="6">
                        <HStack width="full">
                            <SkeletonCircle size="10" />
                            <Skeleton flex="1" height={4} variant="shine" />
                        </HStack>
                        <Skeleton height={220} width='full' />
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default ChartSkeleton