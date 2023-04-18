import Layout from '../components/Layout';
import {getAllData} from '../lib/icons';
import {
  Box,
  Button,
  Flex,
  Heading,
  Hide,
  Image,
  Link,
  Text,
  Tooltip,
  useToken,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import IconDetailOverlay from '../components/IconDetailOverlay';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import React from 'react';
import {GetStaticPropsResult, NextPage} from 'next';
import {Category, IconEntity} from '../types';
import {getAllCategories} from 'src/lib/categories';
import {PackageItem} from "../components/Package";
import Section from "../components/Section";
import useSpacing from "../lib/useSpacing";
import IconCustomizerWidget from "../components/IconCustomizerWidget";
import {fetchCurrentRelease} from '../lib/fetchReleases';
import fetchPackages from "../lib/fetchPackages";
import {fetchNumberOfContributors} from "../lib/fetchAllMetadata";
import packagesData from '../data/packageData.json';
import IconList from "../components/IconList";
import semver from 'semver';

interface HomePageProps {
  data: IconEntity[],
  categories: Category[],
  packages: PackageItem[],
  currentVersion: string,
  contributors: number,
}

const HomePage: NextPage<HomePageProps> = ({
                                             data,
                                             categories,
                                             packages,
                                             currentVersion,
                                             contributors
                                           }) => {
  const containerSpacing = useSpacing('container');
  const sectionSpacingY = useSpacing('sectionY');
  const containerMaxWidth = useToken('sizes', 'container-max-width');
  const dateSorter = (a, b) => a > b ? -1 : (a < b ? 1 : 0);
  const semverSorter = (a, b) => semver.gt(a, b) ? -1 : (semver.lt(a, b) ? 1 : 0);
  return (
    <Layout>
      <MobileMenu/>
      <IconDetailOverlay categories={categories}/>
      <Section variant="odd">
        <Header {...{data, currentVersion, contributors}} />
      </Section>
      <Section variant="first">
        <Hide below="md">
          <Box position="absolute" inset="0"
               backgroundImage="assets/images/bg_1.png"
               backgroundSize="contain"
               backgroundPosition={{
                 base: 'calc(66vw - 4rem) center',
                 lg: 'calc(50vw - 16rem) center'
               }}
               backgroundRepeat="no-repeat"
               zIndex={-2}
          />
          <Box className="bg-blurrer"/>
        </Hide>
        <Flex maxW={containerMaxWidth}>
          <Box maxW={{base: '100%', md: '75%', lg: '50%'}}
               w="full"
               textAlign={{base: 'center', md: 'left'}}
               px={containerSpacing}
               py={sectionSpacingY}
          >
            <Heading as="h2" variant="brandSmallCaps">Why choose Lucide?</Heading>
            <Heading as="h3">Simple to use</Heading>
            <Text>Lucide provides several official packages for a variety of environments, to make
              it easier to use in projects:</Text>
            <Wrap
              marginTop={4}
              marginBottom={6}
              spacing={{base: 4, lg: 6}}
              justify={{base: 'center', lg: 'flex-start'}}
              align="center"
            >
              {packages.map(({name, icon}: PackageItem) => (
                <WrapItem key={name}>
                  <Tooltip hasArrow label={name} aria-label={name}>
                    <Link as={NextLink} href="https://vercel.com?utm_source=lucide&utm_campaign=oss"
                          passHref>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/vercel.svg" alt="Powered by Vercel" width="150"/>
                    </Link>
                    <Link as={NextLink} href={`/docs/${name}`} key={name} _hover={{opacity: 0.8}}
                          aria-label={name}>
                      <Image src={icon}/>
                    </Link>
                  </Tooltip>
                </WrapItem>
              ))}
              <WrapItem>
                <Link as={NextLink} href="/packages" _hover={{opacity: 0.8}} marginX="auto">
                  <Text fontSize="md" opacity={0.5}>More options</Text>
                </Link>
              </WrapItem>
            </Wrap>

            <Heading as="h3" mt={4}>Lightweight, scalable & customizable</Heading>
            <Text>Lucide uses lightweight, highly optimized scalable vector graphics (SVG) for its
              icons, using a strict set of design rules to ensure that our icons are consistent in
              style and readable on all sizes..</Text>

            <Heading as="h3" mt={4}>An active community</Heading>
            <Text>Lucide has an active community of designers all around the world, with
              contributors providing new icons and fulfilling icon requests every week.</Text>
          </Box>
        </Flex>

      </Section>
      <Section variant="even"
               backgroundImage="assets/images/bg_2.png"
               backgroundRepeat="repeat"
               backgroundSize="64rem"
               backgroundAttachment="fixed">
        <Box maxW={containerMaxWidth}
             w="full"
             textAlign={{base: 'center', md: 'left'}}
             px={containerSpacing}
             py={sectionSpacingY}
        >
          <Heading variant="brandSmallCaps">What's new?</Heading>
          <Heading as="h3">Our latest icons</Heading>

          <IconList icons={data.sort((a, b) => semverSorter(a.createdRelease, b.createdRelease)).slice(0, 30)}/>

          <Flex align="center" justify="center">
            <Button as="a"
                    href="/icons"
                    colorScheme='brand'
                    variant='solid'
                    mt={4}
                    size="sm"
            >Browse all icons</Button>
          </Flex>
        </Box>
      </Section>
      <Section variant="odd">
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column', md: 'row'}}
        >
          <Box textAlign={{base: 'center', md: 'left'}} w={{base: '100%', md: '33%', lg: '50%'}}>
            <Heading variant="brandSmallCaps">Customization options</Heading>
            <Heading as="h3">Style as you please</Heading>
            <Text>Lucide allows you to easily customize icons to your needs, using CSS only. Icons
              of different sizes, weights & colours are at your fingertip!</Text>
          </Box>
          <IconCustomizerWidget w={{base: '100%', md: '66%', lg: '50%'}} />
        </Flex>
      </Section>
      <Section variant="even">
        <Hide below="md">
          <Box position="absolute" inset="0"
               backgroundImage="assets/images/bg_3.png"
               backgroundSize="contain"
               backgroundPosition={{base: 'calc(50% - 16.5rem) center'}}
               backgroundRepeat="no-repeat"
          />
        </Hide>
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column', md: 'row'}}
              justify={{base: 'flex-start', md: 'flex-end'}}
        >
          <Box textAlign={{base: 'center', md: 'left'}} w={{base: '100%', md: '50%'}}>
            <Heading variant="brandSmallCaps">Icon requests</Heading>
            <Heading as="h3">Can’t find what you’re looking for?</Heading>
            <Text mb={3}>Lucide has an active community of designers, eager to realize your design
              ideas.</Text>
            <Text>Couldn’t find the icon you desperately need?<br/> Feel free to submit an icon
              request.</Text>
            <Button as="a"
                    href="https://github.com/lucide-icons/lucide/issues/new?assignees=&labels=%F0%9F%99%8C+icon+request&template=icon_request.md"
                    target="_blank"
                    colorScheme='brand'
                    variant='solid'
                    mt={4}
                    size="sm"
            >Submit an icon request</Button>
          </Box>
        </Flex>
      </Section>
      <Section variant="odd">
        <Hide below="md">
          <Box position="absolute" inset="0"
               backgroundImage="assets/images/bg_4.png"
               backgroundSize="auto 100%"
               backgroundPosition={{
                 base: 'calc(50vw - 20rem) center',
                 lg: 'calc(50vw - 12rem) center'
               }}
               backgroundRepeat="no-repeat"
          />
        </Hide>
        <Flex maxW={containerMaxWidth}
              w="full"
              px={containerSpacing}
              py={sectionSpacingY}
              gap={containerSpacing}
              direction={{base: 'column', md: 'row'}}
        >
          <Box textAlign={{base: 'center', md: 'left'}} w={{base: '100%', md: '50%'}}>
            <Heading variant="brandSmallCaps">Bug reports</Heading>
            <Heading as="h3">Something’s bugging you?</Heading>
            <Text mb={3}>While we try to do everything we can to make the Lucide experience as
              seamless as possible, accidents do happen.</Text>
            <Text>In case you run into any issue while using Lucide, feel free to submit a bug
              report.</Text>
            <Button as="a"
                    href="https://github.com/lucide-icons/lucide/issues/new?assignees=&labels=%F0%9F%90%9B+bug&template=bug_report.md"
                    target="_blank"
                    colorScheme='brand'
                    variant='solid'
                    mt={4}
                    size="sm"
            >Submit a bug report</Button>
          </Box>
        </Flex>
      </Section>
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const data = await getAllData({withChildKeys: true});
  const categories = await getAllCategories()
  const currentVersion = await fetchCurrentRelease();
  const packages: PackageItem[] = (await fetchPackages())
    .filter(Boolean)
    .filter((packageObj) => (packageObj.name in packagesData) && (packagesData[packageObj.name].promote ?? false))
    .map(({name, description, flutter}) => {
      const packageDirectory = flutter ? 'lucide-flutter' : name;

      return {
        name,
        description,
        source: `https://github.com/lucide-icons/lucide/tree/main/packages/${packageDirectory}`,
        documentation: `/docs/${packageDirectory}`,
        ...packagesData[packageDirectory],
        icon: `/framework-logos/${packagesData[packageDirectory].icon}.svg`,
      };
    })
    .sort((a, b) => a.order - b.order);

  const contributors = await fetchNumberOfContributors();

  return {
    props: {
      data,
      categories,
      packages,
      contributors,
      currentVersion
    },
  };
}

export default HomePage;
