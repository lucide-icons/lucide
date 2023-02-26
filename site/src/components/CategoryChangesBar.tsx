import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Divider,
} from '@chakra-ui/react';
import theme from '../lib/theme';
import { useMemo, useState } from 'react';
import CodeBlock from './CodeBlock';
import CopyButton from './CopyButton';
import { IconEntity } from 'src/types';

const CategoryChangesBar = ({ categories, changes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const handleSubmit = () => {
    setModalOpen(true);
  };

  const openPullRequestUrl = 'https://github.com/lucide-icons/lucide/edit/master/categories.json';

  const onClose = () => {
    setModalOpen(false);
  };

  const newMappedCategories = useMemo(() => {
    return Object.fromEntries(
      Object.entries(categories).map(([category, icons]) => [
        category,
        (icons as IconEntity[]).map(({ name }) => name),
      ]),
    );
  }, [categories]);

  const categoryCode = useMemo(() => JSON.stringify(newMappedCategories, null, '  '), [
    newMappedCategories,
  ]);

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
            <Text fontSize="lg" fontWeight="bold" marginLeft={4}>
              {changes}
            </Text>
            <Text fontSize="lg" marginLeft={2}>
              changes made to 'categories.json'
            </Text>
          </Flex>
          <Button onClick={handleSubmit} colorScheme="red" variant="solid">
            Submit Pull-request
          </Button>
        </Flex>
      </Box>
      <Modal isOpen={modalOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nice changes!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>To submit those changes, follow these steps:</Text>
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
            <Button as="a" variant="solid" href={openPullRequestUrl} target="__blank">
              Open pull-request
            </Button>
            <Divider mt={8} mb={4} />
            <Text fontWeight="bold" mt={6} mb={4}>
              Code:
            </Text>
            <Button as="a" variant="solid" onClick={() => setShowCode(show => !show)}>
              Show code
            </Button>
            {showCode && (
              <Box maxHeight={320} overflow="auto" background="gray.800">
                <CodeBlock code={categoryCode} language="json" showLines />
              </Box>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CategoryChangesBar;
