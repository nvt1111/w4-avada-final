import {
  Card,
  ResourceList,
  ResourceItem,
  TextStyle,
  Page,
  Stack,
  Layout,
  Pagination
} from '@shopify/polaris';
import React, { useState } from 'react';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import { formatDate } from '../../helpers/formatDate';
import '../../styles/components/notification/notification.scss'
import useFetchApi from '../../hooks/api/useFetchApi'

export default function Notifications() {
  const { data: items, setData: setItems } = useFetchApi({ url: '/notifications' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const settings = { hideTimeAgo: false, truncateProductName: false }
  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit')
    }
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags')
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags')
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete')
    }
  ];

  return (
    <Page fullWidth title="Notifications" subtitle="List of sales notifications from shopify">
      <Layout>
        <Layout.Section>
          <Card>
            <ResourceList
              resourceName={resourceName}
              items={items}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
              renderItem={item => {
                const {
                  id,
                  firstName,
                  city,
                  country,
                  productName,
                  createdAt,
                  productImage
                } = item;
                return (
                  <ResourceItem id={id} accessibilityLabel={`View details for ${name}`}>
                    <Stack distribution="equalSpacing">
                      <NotificationPopup
                        id={id}
                        firstName={firstName}
                        city={city}
                        country={country}
                        productName={productName}
                        createdAt={createdAt}
                        productImage={productImage}
                        settings={settings}
                      />
                      <TextStyle variant="bodyMd" font="Arial" fontWeight="bold" as="h3">
                        <div>
                          From {formatDate(createdAt)[1]} {formatDate(createdAt)[2]},{' '}
                        </div>
                        <Stack distribution="trailing">
                          <div>{formatDate(createdAt)[3]}</div>
                        </Stack>
                      </TextStyle>
                    </Stack>
                  </ResourceItem>
                );
              }}
              sortValue={sortValue}
              sortOptions={[
                { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
                { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' }
              ]}
              onSortChange={selected => {
                setSortValue(selected);
                console.log(`Sort option changed to ${selected}.`);
              }}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Stack distribution="center">
            <Pagination
              hasPrevious
              onPrevious={() => {
                console.log('Previous');
              }}
              hasNext
              onNext={() => {
                console.log('Next');
              }}
            />
          </Stack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
