import { SyntheticEvent } from "react"

interface PageProps {
  version: string
}

const Info = ({ version }: PageProps) => {
  const menuItems = [
    {
      name: 'Report a bug',
      url: 'https://github.com/lucide-icons/lucide/issues'
    },
    {
      name: 'Contribute an icon',
      url: 'https://github.com/lucide-icons/lucide/blob/main/CONTRIBUTING.md'
    },
    {
      name: 'Website',
      url: 'https://lucide.dev'
    },
    {
      name: 'Repository',
      url: 'https://github.com/lucide-icons/lucide'
    },
    {
      name: 'License',
      url: 'https://lucide.dev/license'
    },
    {
      name: 'Community Page',
      url: 'https://www.figma.com/community/plugin/939567362549682242/Lucide-Icons'
    },
    {
      name: 'Supported Frameworks',
      url: 'https://lucide.dev/packages'
    }
  ]

  const onClick = (url: string) => (event: SyntheticEvent) => {
    event.preventDefault()

    window.open(url,'_blank')
  }

  return (
    <div className="info-page">
      <img src="https://lucide.dev/logo-text.svg" alt="Lucide Logo" className="lucide-logo"/>
      <p className='version'>
        v{version}
      </p>
      <section className="link-list">
        {
          menuItems.map(({ name, url }) => (
            <a href={url} key={name} aria-label={name} className="info-link" onClick={onClick(url)}>
              {name}
            </a>
          ))
        }
      </section>
    </div>
  )
}

export default Info
