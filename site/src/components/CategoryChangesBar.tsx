import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/core"
import theme from "../lib/theme";
import { useState } from "react"
import CodeBlock from './CodeBlock'

const CategoryChangesBar = ({categories, changes}) => {
  const [modalOpen, setModalOpen ] = useState(false);
  const handleSubmit = () => {
    console.log('handleSubmit');
    setModalOpen(true);
  }

  const onClose = () => {
    setModalOpen(false);
  }

  const exampleCode = `
{
  "arrows": ["arrow-right", "arrow-down-right"],
  "brands": ["facebook"],
  "code": ["code", "terminal"],
  "connectivity": ["airplay"],
  "communication": ["phone"],
  "cursors": ["mouse-pointer"],
  "devices": ["alarm-clock"],
  "graphics edit": ["box-select", "lasso-select"],
  "file system": ["file"],
  "layout": ["layout"],
  "maths": ["activity"],
  "multimedia": ["play"],
  "notifications": ["alert-circle", "alert-octagon", "alert-triangle"],
  "nature": ["wind"],
  "shopping": ["shirt"],
  "shapes": ["square"],
  "sports": ["award"],
  "text edit": ["align-center","align-right","align-left","align-justify" ]
}
  `.trim();

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
          <Button onClick={handleSubmit}>Submit Pull-request</Button>
        </Flex>
      </Box>
      <Modal isOpen={modalOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit those changes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Here's the json output of the changes you made. Please copy the output and paste it in github to submit the changes to the repository.</Text>
            <CodeBlock
              code={exampleCode}
              language="json"
              showLines
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
    </Modal>
  </>
  )
}

export default CategoryChangesBar;
