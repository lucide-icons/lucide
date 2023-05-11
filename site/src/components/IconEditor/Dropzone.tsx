import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Center, useColorModeValue, Text, Icon } from '@chakra-ui/react';
import { FileUp } from 'lucide-react';

type DropzoneProps = {
  onFileAccepted: (file: File) => void;
};

export default function Dropzone({ onFileAccepted }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileAccepted(acceptedFiles[0]);
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    maxFiles: 1,
    multiple: false,
  });

  const activeBg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('blue.500', 'blue.400');
  const hoverColor = useColorModeValue('blue.600', 'blue.300');

  return (
    <Center
      p={10}
      cursor="pointer"
      color={color}
      bg={isDragActive ? activeBg : 'transparent'}
      _hover={{ bg: activeBg, color: hoverColor, borderColor: hoverColor }}
      transition="background-color 0.2s ease"
      borderRadius={12}
      border="2px dashed"
      borderColor={color}
      display="flex"
      flexDirection="column"
      gap={2}
      width="320px"
      height="320px"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon as={FileUp} boxSize={12} strokeWidth={1} />
      <Text textAlign="center">Drag and drop .svg file, or click to upload.</Text>
    </Center>
  );
}
