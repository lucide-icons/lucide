import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Divider } from "@chakra-ui/react"
import theme from "../lib/theme";
import { useEffect, useMemo, useState } from "react"
import CodeBlock from './CodeBlock'
import CopyButton from "./CopyButton";

const CategoryChangesBar = ({categories, changes}) => {
  const [modalOpen, setModalOpen ] = useState(false);
  const handleSubmit = () => {
    setModalOpen(true);
  }

  const openPullRequestUrl = 'https://github.com/lucide-icons/lucide/edit/master/categories.json';

  const onClose = () => {
    setModalOpen(false);
  }

  const categoryCode = useMemo(() => JSON.stringify(categories, null, '  '), [categories])

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        width="full"
        boxShadow={theme.shadows.xl}
        position="relative"
        padding={4}
        maxW="960px"
        margin="0 auto"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="lg">You're editing the overview categories.</Text>
          <Flex>
            <Text fontSize="lg" fontWeight="bold" marginLeft={4}>{changes}</Text>
            <Text fontSize="lg" marginLeft={2}>changes made to 'categories.json'</Text>
          </Flex>
          <Button onClick={handleSubmit} variant="primary">Submit Pull-request</Button>
        </Flex>
      </Box>
      <Modal isOpen={modalOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nice changes!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              To submit those changes, follow these steps:
            </Text>
            <Text fontWeight="bold" mt={4}>
              Step 1:
            </Text>
            <Text mt={2} mb={2}>
              Copy all the code,
            </Text>

            <CopyButton copyText={categoryCode} buttonText="Copy code" mr={4} />
            <Text fontWeight="bold" mt={6}>
              Step 2:
            </Text>
            <Text mt={2} mb={4}>
              Open Pull-request, select-all and paste the code with the changes.
            </Text>
            <Button
              as="a"
              variant="primary"
              href={openPullRequestUrl}
              target="__blank"
            >
              Open pull-request
            </Button>
            <Divider mt={8} mb={4} />
            <Text fontWeight="bold" mt={6} mb={4}>
              Your code:
            </Text>
            <Text mt={2} mb={4}>
              Here's the json output of the changes you made.
            </Text>
            <CodeBlock
              code={categoryCode}
              language="json"
              showLines
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  </>
  )
}

export default CategoryChangesBar;
