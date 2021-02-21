// 'https://api.github.com/repos/lucide-icons/lucide/compare/v0.13.0...master'
import output from './tempOutput.json';

const iconFolderRegex = /icons\/(.*)\.svg/g;

const changedFiles = output.files.filter(
  ({ filename }) => !filename.match(/site\/(.*)|(.*)package\.json/g),
);

const addedIcons = changedFiles.filter(
  ({ status, filename }) => status === 'added' && filename.match(iconFolderRegex),
);

const modifiedIcons = changedFiles.filter(
  ({ status, filename }) => status === 'modified' && filename.match(iconFolderRegex),
);

// const addedIconsWithcommits
// console.log(modifiedIcons);

const topics = {
  newIcons: 'New Icons',
  modifiedIcons: 'Modified Icons',
  codeChanges: 'Code improvements',
  docs: 'Docs',
  lucide: 'Lucide Package',
  lucideReact: 'Lucide React Package',
  lucideVue: 'Lucide Vue Package',
};
