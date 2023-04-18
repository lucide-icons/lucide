import {
  Box,
  Spinner,
  Button,
  Card,
  CardBody,
  chakra,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Tab,
  TabList,
  Tabs,
  Tag,
  TagLabel,
  TagLeftIcon,
  useBreakpointValue,
  useToken
} from '@chakra-ui/react';
import {Step, Steps} from "chakra-ui-steps";
import React, {useMemo} from 'react';
import {useRouter} from 'next/router';
import {getAllData, getData} from '../../lib/icons';
import Layout from '../../components/Layout';
import {GetStaticPaths, GetStaticProps} from 'next';
import {getAllCategories} from 'src/lib/categories';
import IconDetail from "../../components/IconDetail";
import Section from "../../components/Section";
import useSpacing from "../../lib/useSpacing";
import {
  AlarmClock,
  Bug,
  Check,
  CheckCircle2,
  Clipboard,
  Contact,
  Copy,
  createLucideIcon,
  Eye,
  Feather,
  File,
  FileText,
  Folder,
  FolderOpen,
  Gauge,
  Heart,
  HelpCircle,
  Home,
  Info,
  Key,
  Lock,
  Plus,
  Scissors,
  Star,
  ThumbsUp,
  Wand,
  Wrench,
} from "lucide-react";
import IconList from "../../components/IconList";
import {findSimilarIcons} from "../../lib/findSimilarIcons";
import IconDetailOverlay from "../../components/IconDetailOverlay";
import MobileMenu from "../../components/MobileMenu";

const IconPage = ({icon, data, categories, similarIcons}): JSX.Element => {
  const router = useRouter();
  const getIcon = iconName => data.find(({name}) => name === iconName) || {};
  const containerSpacing = useSpacing('container');
  const sectionSpacingY = useSpacing('sectionY');
  const tabOrientation: 'vertical' | 'horizontal' = useBreakpointValue({base: 'vertical', sm: 'horizontal'});
  const containerMaxWidth = useToken('sizes', 'container-max-width');

  const Icon = createLucideIcon(icon.name, icon.iconNode)
  const currentIcon = useMemo(() => {
    if (icon.name === router.query.iconName) {
      return icon;
    }
    return getIcon(router.query.iconName);
  }, [router.query]);

  if (router.isFallback) {
    return (
      <Spinner />
    );
  }

  const gridProps = {
    templateAreas: [
      `"narrow1" "narrow2" "narrow3" "wide1" "narrow4" "narrow5" "narrow6" "wide2"`,
      `"narrow1 narrow2" "wide1 wide1" "narrow3 narrow4" "wide2 wide2" "narrow5 narrow6"`,
      `"narrow1 narrow1 narrow2 narrow2 narrow3 narrow3" "wide1 wide1 wide1 wide2 wide2 wide2" "narrow4 narrow4 narrow5 narrow5 narrow6 narrow6"`,
    ],
    gridTemplateRows: [
      'repeat(8, auto)',
      'repeat(5, auto)',
      'repeat(3, 1fr)',
    ],
    gridTemplateColumns: [
      '1fr',
      'repeat(2, 1fr)',
      'repeat(6, 1fr)',
    ],
    gap: [4, 6, 8],
  };
  return (
    <Layout>
      <MobileMenu/>
      <IconDetailOverlay categories={categories}/>
      <Section variant='odd'>
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column', md: 'row'}}
        >
          <IconDetail categories={categories} icon={currentIcon}/>
        </Flex>
      </Section>
      <Section variant='even'>
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column'}}
        >

          <Box w="full"
               textAlign={{base: 'left'}}
          >
            <Heading as="h2" variant="brandSmallCaps">Not sure yet?</Heading>
            <Heading as="h3">See <chakra.code
              color='brand.500'>{currentIcon.name}</chakra.code> in action!</Heading>
          </Box>
          <Grid
            {...gridProps}
            alignItems='stretch'
          >
            <GridItem area='narrow1'>
              <Card variant='iconDemo'>
                <CardBody gap={2}>
                  <Button leftIcon={<Icon/>} colorScheme='brand' variant='solid'>
                    OK
                  </Button>
                  <Button colorScheme='gray' variant='ghost'>
                    Cancel
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='narrow2'>
              <Card variant='iconDemo'>
                <CardBody>
                  <form>
                    <Stack spacing={4}>
                      <InputGroup>
                        <InputLeftElement
                          color='gray.500'
                          pointerEvents='none'
                          children={<Icon/>}
                        />
                        <Input colorScheme='brand' variant='outline'
                               placeholder='Enter a value...'/>
                      </InputGroup>

                      <InputGroup>
                        <InputLeftElement
                          color='gray.500'
                          pointerEvents='none'
                          children={icon.name === 'lock' ? <Key/> : <Lock/>}
                        />
                        <Input colorScheme='brand' type="password" variant='outline'
                               placeholder='•••••••••••'/>
                        <InputRightElement color='gray.500' children={<Eye/>}/>
                      </InputGroup>
                    </Stack>
                  </form>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='narrow3'>
              <Card variant='iconDemo'>
                <CardBody>
                  <Tag variant='subtle' colorScheme='red'>
                    <TagLeftIcon boxSize='12px' as={Bug}/>
                    <TagLabel>Bug</TagLabel>
                  </Tag>
                  <Tag variant='subtle' colorScheme='green'>
                    <TagLeftIcon boxSize='12px' as={icon.name === 'wrench' ? Wand : Wrench}/>
                    <TagLabel>Feature</TagLabel>
                  </Tag>
                  <Tag variant='subtle' colorScheme='blue'>
                    <TagLeftIcon boxSize='12px' as={Icon}/>
                    <TagLabel>Info</TagLabel>
                  </Tag>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='wide1'>
              <Card variant='iconDemo'>
                <CardBody>
                  <Tabs
                    size='sm' defaultIndex={2} colorScheme='brand'
                    orientation={tabOrientation}
                  >
                    <TabList>
                      <Tab gap={1}>
                        {icon.name !== 'home' ? <Home/> : <Gauge/>}
                        Home
                      </Tab>
                      <Tab gap={1}>
                        {icon.name !== 'feather' ? <Feather/> : <Contact/>}
                        Contact
                      </Tab>
                      <Tab gap={1}>
                        <Icon/>
                        About
                      </Tab>
                      <Tab gap={1}>
                        {icon.name !== 'help-circle' ? <HelpCircle/> : <Info/>}
                        Help
                      </Tab>
                    </TabList>
                  </Tabs>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='wide2'>
              <Card variant='iconDemo'>
                <CardBody>
                  <Steps
                    variant='circles-alt'
                    orientation='horizontal'
                    colorScheme='brand'
                    mobileBreakpoint='xxs'
                    activeStep={2}
                  >
                    <Step label='Privacy' checkIcon={Check}></Step>
                    <Step label='Personal' checkIcon={Check}></Step>
                    <Step label='Misc.' icon={Icon} checkIcon={Check}></Step>
                    <Step label='Done' icon={CheckCircle2} checkIcon={Check}></Step>
                  </Steps>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='narrow4'>
              <Card variant='iconDemo'>
                <CardBody>
                  <Flex direction='row'>
                    <Button variant='ghost'
                            leftIcon={icon.name !== 'heart' ? <Heart/> : <Star/>}
                    >15</Button>
                    <Button variant='ghost'
                            leftIcon={icon.name !== 'thumbs-up' ? <ThumbsUp/> : <Star/>}
                    >25</Button>
                    <Button variant='ghost'
                            leftIcon={<Icon/>}
                    >10</Button>
                  </Flex>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='narrow5'>
              <Card variant='iconDemo'>
                <CardBody>
                  <Stack w='100%' spacing={2} justifyContent='stretch'>
                    <Button justifyContent='between'
                            leftIcon={icon.name !== 'folder' ? <Folder/> : <FolderOpen/>}
                    >Charter <Plus style={{marginLeft: 'auto'}}/></Button>
                    <Button justifyContent='between'
                            leftIcon={icon.name !== 'file' ? <File/> : <FileText/>}
                    >Document</Button>
                    <Button justifyContent='between'
                            leftIcon={<Icon/>}>Widget</Button>
                  </Stack>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem area='narrow6'>
              <Card variant='iconDemo'>
                <CardBody>
                  <IconButton isRound={true} aria-label=""
                              icon={icon.name !== 'copy' ? <Copy/> : <AlarmClock/>}
                  ></IconButton>
                  <IconButton isRound={true} aria-label=""
                              icon={icon.name !== 'scissors' ? <Scissors/> : <AlarmClock/>}
                  ></IconButton>
                  <IconButton isRound={true} aria-label=""
                              icon={icon.name !== 'clipboard' ? <Clipboard/> : <AlarmClock/>}
                  ></IconButton>
                  <IconButton isRound={true} aria-label=""
                              icon={<Icon/>}></IconButton>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>
        </Flex>
        <Divider></Divider>
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column'}}
        >

          <Box w="full"
               textAlign={{base: 'left'}}
          >
            <Heading as="h2" variant="brandSmallCaps">Not quite what you need?</Heading>
            <Heading as="h3">More icons
              like <chakra.code color='brand.500'>{currentIcon.name}</chakra.code></Heading>
            <Flex alignItems='center' justifyContent='center' direction='column'>
              <Box flex={1} w='100%'>
                <IconList icons={similarIcons}></IconList>
              </Box>
              <Link href="/icons">
                <Button colorScheme='brand' variant='solid'>Browse all icons</Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

export default IconPage;

export const getStaticProps: GetStaticProps = async ({params: {iconName}}) => {
  const data = await getAllData({withChildKeys: true});
  const icon = await getData(iconName as string, {withChildKeys: true});
  const categories = await getAllCategories()
  const similarIcons = findSimilarIcons(data, icon);

  return {
    props: {icon, categories, similarIcons},
    revalidate: 1800,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
};
