import { Box, BoxProps, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue, useTheme, useColorModeValue } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Fragment, useMemo } from "react"
import {Category, IconEntity} from "src/types"
import {createLucideIcon} from "lucide-react";

const ListWrapper = ({ children, ...restProps }: BoxProps) => {
  return (
    <Box
      w="full"
      h="full"
      overflowY="auto"
      sx={{
        direction: 'rtl',
        '&::-webkit-scrollbar' : {
          width: '4px',
        },
        '&::-webkit-scrollbar-track' : {
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb' : {
          bgColor: useColorModeValue('var(--chakra-colors-gray-300)', 'var(--chakra-colors-whiteAlpha-300)'),
          borderRadius: 0,
        },
      }}
      {...restProps}
    >
      <Box
        whiteSpace="nowrap"
        height="100%"
        display="flex"
        flexDirection="column"
        paddingBottom={8}
        paddingX={2}
        paddingY={1}
        paddingRight={4}
        sx={{
          direction: 'ltr'
        }}
      >
        { children }
      </Box>
    </Box>
  )
}

const CATEGORY_TOP_OFFSET = 100

interface IconCategoryDrawerProps {
  data: IconEntity[];
  categories: Category[]
  setCategoryView: (view: boolean) => void
  open: boolean
  onClose: () => void
}

const IconCategoryDrawer = ({ open, onClose, categories, data, setCategoryView }: IconCategoryDrawerProps) => {
  const theme = useTheme()

  const useCustomDrawer = useBreakpointValue({ base: false, md: true });

  const sidebarVariants = {
    closed: {
      width: 0,
    },
    open: {
      width: theme.sizes['xs']
    }
  }

  const categoryList = useMemo(() => {
    return (
      <>
        {[{ name: 'all', title: 'All', icon: null, iconCount: data.length }, ...categories].map(({ title, name, icon, iconCount }) => {
          // Show category icon?
          const iconData = data.find(({ name: iconName }) => iconName === icon)
          const Icon = iconData ? createLucideIcon(iconData.name, iconData.iconNode) : null

          return (
            <Fragment key={name}>
              <Button
                as="a"
                colorScheme='gray'
                variant='ghost'
                width="100%"
                justifyContent="space-between"
                leftIcon={Icon ? <Icon /> : null}
                onClick={(event) => {
                  event.stopPropagation()

                  if (!useCustomDrawer) {
                    onClose()

                    const [routePath] = window.location.href.split('#')

                    setTimeout(() =>{
                      window.location.href = `${routePath}#${name}`
                    },150)
                  }

                  setCategoryView(name !== 'all')
                }}
                href={useCustomDrawer ? `#${name}` : undefined}
                marginBottom={1}
                sx={{
                  opacity: .7,
                  flexShrink: 0,
                  '&.active': {
                    color: 'brand.500'
                  }
                }}
              >
                <Box width='100%'>{title}</Box>
                <Box sx={{opacity: .5}}><small>{iconCount}</small></Box>
              </Button>
              {name === 'all' && (
                <Divider marginY={2} />
              )}
            </Fragment>
          )
        })}
        <Box h={8} flexShrink={0}></Box>
      </>
    )
  }, [categories, useCustomDrawer])

  if(useCustomDrawer) {
    return (
      <motion.div
        variants={sidebarVariants}
        animate={(open ?? useCustomDrawer) ? 'open' : 'closed'}
        initial={false}
        style={{
          height: `calc(100vh - ${CATEGORY_TOP_OFFSET}px)`,
          position: 'sticky',
          top: '100px'
        }}
      >
        <ListWrapper>
          {categoryList}
        </ListWrapper>
      </motion.div>
    )
}

return (
  <Drawer
    placement="left"
    onClose={onClose}
    isOpen={open}
    size="sm"
    blockScrollOnMount={false}
  >
    <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={3.5} marginRight={3} />
        <DrawerHeader />
        <DrawerBody>
          <ListWrapper>
            {categoryList}
          </ListWrapper>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default IconCategoryDrawer
