import {
  Hide,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  Tooltip,
  useToken,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import {getAllData} from '../lib/icons';

import IconDetailOverlay from '../components/IconDetailOverlay';
import {useRouter} from 'next/router';
import NextLink from 'next/link';
import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import {useMemo} from 'react';
import {GetStaticPropsResult, NextPage} from 'next';
import {IconEntity} from '../types';
import {PackageItem} from "../components/Package";
import fetchPackages from "../lib/fetchPackages";
import Section from "../components/Section";
import packagesData from "../data/packageData.json";
import IconList from "../components/IconList";
import useSpacing from "../lib/useSpacing";
import IconCustomizerWidget from "../components/IconCustomizerWidget";

interface HomePageProps {
  data: IconEntity[],
  packages: PackageItem[],
}

const HomePage: NextPage<HomePageProps> = ({data, packages}) => {
  const router = useRouter();
  const getIcon = iconName => data.find(({name}) => name === iconName);

  const currentIcon = useMemo(() => {
    return getIcon(router.query.iconName)
  }, [router.query])

  return (
    <Layout>
      <MobileMenu/>
      <IconDetailOverlay
        open={!!currentIcon?.name}
        icon={currentIcon}
        close={() => router.push('/', undefined, {shallow: true})}
      />
      <Section variant="odd">
        <Header {...{data}} />
      </Section>
      <Section variant="first">
        <Hide below="md">
          <Box position="absolute" inset="0"
               backgroundImage="assets/images/bg_1.png"
               backgroundSize="contain"
               backgroundPosition={{base: 'calc(66vw - 4rem) center', lg: 'calc(50vw - 8rem) center'}}
               backgroundRepeat="no-repeat"
               zIndex={-1}
          />
        </Hide>
        <Flex maxW={useToken('sizes', 'container-max-width')}>
          <Box maxW={{base: '100%', md: '75%', lg: '50%'}}
               w="full"
               align="left"
               px={useSpacing('container')}
               py={useSpacing('sectionY')}
          >
            <Heading level="2" variant="brandSmallCaps">Why choose Lucide?</Heading>
            <Heading level="3">Simple to use</Heading>
            <Text>Lucide provides several official packages for a variety of environments, to make
              it easier to use in projects:</Text>
            <Wrap
              marginTop={4}
              marginBottom={6}
              spacing={{base: 4, lg: 6}}
              justify={{base: 'center', lg: 'flex-start'}}
              align="center"
            >
              {packages.map(({name, icon, description}: PackageItem) => (
                <WrapItem key={name}>
                  <Tooltip hasArrow label={name} aria-label={name}>
                    <NextLink href={`/docs/${name}`} key={name} passHref>
                      <Link _hover={{opacity: 0.8}} aria-label={name}>
                        <Image src={icon}/>
                      </Link>
                    </NextLink>
                  </Tooltip>
                </WrapItem>
              ))}
              <WrapItem>
                <NextLink href="/packages" passHref>
                  <Link _hover={{opacity: 0.8}} marginX="auto">
                    <Text fontSize="md" opacity={0.5}>More options</Text>
                  </Link>
                </NextLink>
              </WrapItem>
            </Wrap>

            <Heading level="3" mt={4}>Lightweight, scalable & customizable</Heading>
            <Text>Lucide uses lightweight, highly optimized scalable vector graphics (SVG) for its
              icons, using a strict set of design rules to ensure that our icons are consistent in
              style and readable on all sizes..</Text>

            <Heading level="3" mt={4}>An active community</Heading>
            <Text>Lucide has an active community of designers all around the world, with
              contributors providing new icons and fulfilling icon requests every week.</Text>
          </Box>
        </Flex>

      </Section>
      <Section variant="even" backgroundImage="assets/images/bg_2.png">
        <Box maxW={useToken('sizes', 'container-max-width')}
             w="full"
             px={useSpacing('container')}
             py={useSpacing('sectionY')}
        >
          <Heading variant="brandSmallCaps">What's new?</Heading>
          <Heading level="3">Our latest icons</Heading>

          {/* @TODO: fetch latest icons instead of randomizing */}
          <IconList icons={data.sort(() => Math.random() - 0.5).slice(0, 30)} rows={3} />

          <Flex align="center" justify="center">
            <Button as="a" href="/icons" colorScheme="brand" mt={4} size="sm">Browse all icons</Button>
          </Flex>
        </Box>
      </Section>
      <Section variant="odd">
        <Flex maxW={useToken('sizes', 'container-max-width')}
              w="full"
              px={useSpacing('container')}
              py={useSpacing('sectionY')}
              gap={useSpacing('container')}
              direction={{base: 'column', md: 'row'}}
        >
          <Box align="left" w={{base: '100%', md: '33%', lg: '50%'}}>
            <Heading variant="brandSmallCaps">Customization options</Heading>
            <Heading level="3">Style as you please</Heading>
            <Text>Lucide allows you to easily customize icons to your needs, using CSS only. Icons of different sizes, weights & colours are at your fingertip!</Text>
          </Box>
          {/* @TODO: fetch certain icons instead of randomizing? */}
          <IconCustomizerWidget icons={data.sort(() => Math.random() - 0.5).slice(0, 10)}
                                w={{base: '100%', md: '66%', lg: '50%'}}
          />
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
        <Flex maxW={useToken('sizes', 'container-max-width')}
              w="full"
              px={useSpacing('container')}
              py={useSpacing('sectionY')}
              gap={useSpacing('container')}
              direction={{base: 'column', md: 'row'}}
              justify={{base: 'flex-start', md: 'flex-end'}}
        >
          <Box align="left" w={{base: '100%', md: '50%'}}>
            <Heading variant="brandSmallCaps">Icon requests</Heading>
            <Heading level="3">Can’t find what you’re looking for?</Heading>
            <Text mb={3}>Lucide has an active community of designers, eager to realize your design ideas.</Text>
            <Text>Couldn’t find the icon you desperately need?<br /> Feel free to submit an icon request.</Text>
            <Button as="a"
                    href="https://github.com/lucide-icons/lucide/issues/new?assignees=&labels=%F0%9F%99%8C+icon+request&template=icon_request.md"
                    isExternal
                    colorScheme="brand"
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
               backgroundPosition={{base: 'calc(50vw - 20rem) center', lg: 'calc(50vw - 12rem) center'}}
               backgroundRepeat="no-repeat"
          />
        </Hide>
        <Flex maxW={useToken('sizes', 'container-max-width')}
              w="full"
              px={useSpacing('container')}
              py={useSpacing('sectionY')}
              gap={useSpacing('container')}
              direction={{base: 'column', md: 'row'}}
        >
          <Box align="left" w={{base: '100%', md: '50%'}}>
            <Heading variant="brandSmallCaps">Bug reports</Heading>
            <Heading level="3">Something’s bugging you?</Heading>
            <Text mb={3}>While we try to do everything we can to make the Lucide experience as seamless as possible, accidents do happen.</Text>
            <Text>In case you run into any issue while using Lucide, feel free to submit a bug report.</Text>
            <Button as="a"
                    href="https://github.com/lucide-icons/lucide/issues/new?assignees=&labels=%F0%9F%90%9B+bug&template=bug_report.md"
                    isExternal
                    colorScheme="brand"
                    mt={4}
                    size="sm"
            >Submit a bug report</Button>
          </Box>
        </Flex>
      </Section>
      {/*<Section variant="even">TODO?: Partners</Section>*/}
    </Layout>
  );
};

export async function getStaticProps(): Promise<GetStaticPropsResult<HomePageProps>> {
  const data = await getAllData();
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

  return {
    props: {
      data,
      packages,
    },
  };
}

export default HomePage;
