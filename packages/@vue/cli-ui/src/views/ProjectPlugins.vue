<template>
  <div class="project-plugins page">
    <ContentView
      :title="$t('views.project-plugins.title')"
      class="limit-width"
    >
      <template slot="actions">
        <VueButton
          icon-left="add"
          :label="$t('views.project-plugins.button')"
          class="primary round"
          :to="{ name: 'project-plugins-add' }"
          data-testid="add-plugin"
        />

        <VueDropdown>
          <VueButton
            slot="trigger"
            icon-left="more_vert"
            class="icon-button flat round"
          />

          <VueDropdownButton
            icon-left="file_download"
            :label="$t('views.project-plugins.update-all')"
            @click="updateAll()"
          />
        </VueDropdown>
      </template>

      <ApolloQuery
        :query="require('../graphql/projectPlugins.gql')"
      >
        <template slot-scope="{ result: { data, loading } }">
          <div class="cta-text">{{ $t('views.project-plugins.heading') }}</div>

          <VueLoadingIndicator
            v-if="loading && !data"
            class="overlay"
          />

          <div v-else-if="data" class="plugins">
            <ProjectPluginItem
              v-for="plugin of data.projectCurrent.plugins"
              :key="plugin.id"
              :plugin="plugin"
            />
          </div>
        </template>
      </ApolloQuery>
    </ContentView>

    <ProgressScreen
      progress-id="plugin-update"
    />
  </div>
</template>

<script>
import PLUGINS_UPDATE from '../graphql/pluginsUpdate.gql'

export default {
  name: 'ProjectPlugins',

  metaInfo () {
    return {
      title: this.$t('views.project-plugins.title')
    }
  },

  methods: {
    updateAll () {
      return this.$apollo.mutate({
        mutation: PLUGINS_UPDATE
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/style/imports"

.project-plugins
  .content-view /deep/ > .content
    overflow-y auto
</style>
