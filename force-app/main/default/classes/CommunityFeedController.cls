public with sharing class CommunityFeedController {
    @AuraEnabled(cacheable=true)
    public static ConnectApi.FeedElementPage getFeedElementPageForCommunity(String networkId) {
    return ConnectApi.ChatterFeeds.getFeedElementsFromFeed(networkId, ConnectApi.FeedType.UserProfile,
        'me', 3, ConnectApi.FeedDensity.FewerUpdates, null, null,
        ConnectApi.FeedSortOrder.LastModifiedDateDesc, ConnectApi.FeedFilter.CommunityScoped);
    }
}