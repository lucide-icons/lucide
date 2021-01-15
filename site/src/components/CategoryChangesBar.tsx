import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Divider } from "@chakra-ui/core"
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
          <ModalHeader>Submit those changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Here's the json output of the changes you made. Please copy the output and paste it in github to submit the changes to the repository.</Text>
            <Divider mt={4} mb={4} />
            <CopyButton copyText={categoryCode} buttonText="Copy code" mr={4} />
            <Button
              as="a"
              variant="primary"
              href={openPullRequestUrl}
              target="__blank"
            >
              Open pull-request
            </Button>
            <CodeBlock
              code={categoryCode}
              language="json"
              showLines
              mt={4}
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
