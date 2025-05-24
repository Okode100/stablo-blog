import { type StructureBuilder } from "sanity/desk";
import { type DefaultDocumentNodeResolver } from 'sanity/desk';

// Add the singleton plugin
export const singletonPlugin = (types: string[]) => {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide 'create new' button for singleton types
      newDocumentOptions: (prev: any, { creationContext }: any) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem: { templateId: string }) =>
              !types.includes(templateItem.templateId)
          );
        }
        return prev;
      },
      // Disable delete action for singleton types
      actions: (prev: any, { schemaType }: any) => {
        if (types.includes(schemaType)) {
          return prev.filter(({ action }: { action: string }) => action !== 'delete');
        }
        return prev;
      },
    },
  };
};

export const pageStructure = (
  typeDefArray: { title: string; name: string }[]
) => {
  return (S: StructureBuilder) => {
    // Loop through all the singletons and create a list item for each
    const singletonItems = typeDefArray.map((typeDef) => {
      return S.listItem()
        .title(typeDef.title || typeDef.name)
        .icon(() => "🎛")
        .child(
          S.document()
            .schemaType(typeDef.name)
            .documentId(typeDef.name)
        );
    });

    // The default root list items (except custom ones)
    const defaultListItems = S.documentTypeListItems().filter(
      (listItem) =>
        !typeDefArray.find(
          (singleton) => singleton.name === listItem.getId()
        )
    );

    // Add Archive Banner at the top level
    const archiveBannerListItem = S.listItem()
      .title('Archive Banner')
      .icon(() => '🖼')
      .child(
        S.documentList()
          .title('Archive Banner')
          .filter('_type == "archiveBanner"')
      );

    return S.list()
      .title("Content")
      .items([archiveBannerListItem, ...singletonItems, ...defaultListItems]);
  };
}; 