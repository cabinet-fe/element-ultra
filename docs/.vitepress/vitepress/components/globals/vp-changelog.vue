<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import VPLink from '../common/vp-link.vue'
import VPMarkdown from '../common/vp-markdown.vue'

interface Release {
  id: number
  name: string
}

const loading = ref(true)
const releases = ref<Release[]>([])
const currentRelease = ref()

const onVersionChange = (val) => {
  const _releases = releases.value
  currentRelease.value = _releases[_releases.findIndex((r) => r.name === val)]
}

onMounted(async () => {
  try {
    const { data } = await axios.get<Release[]>(
      'https://api.github.com/repos/wenhongjie/element-pro/releases'
    )
    releases.value = data
    currentRelease.value = data[0]
  } catch (e) {
    releases.value = []
    currentRelease.value = undefined
    // do something
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="changelogs">
    <ClientOnly>
      <ElSkeleton :loading="loading">
        <div class="changelog-versions">
          <p>选择版本:</p>
          <ElSelect
            :model-value="currentRelease.name"
            placeholder="选择版本"
            style="min-width: 200px"
            @change="onVersionChange"
          >
            <ElOption
              v-for="release in releases"
              :key="release.id"
              :value="release.name"
            >
              {{ release.name }}
            </ElOption>
          </ElSelect>
        </div>
        <ElCard v-if="currentRelease">
          <template #header>
            <div class="changelog-header">
              <div class="changelog-meta">
                <p class="changelog-by">
                  published-by
                  <strong>{{ currentRelease.author.login }}</strong>
                </p>
                <p class="changelog-date">
                  {{
                    new Date(currentRelease.published_at).toLocaleString(
                      'zh-CN'
                    )
                  }}
                </p>
              </div>
              <div class="operators">
                <VPLink :href="currentRelease.html_url"> 打开链接 </VPLink>
              </div>
            </div>
          </template>
          <div>
            <VPMarkdown :content="currentRelease.body" />
          </div>
        </ElCard>
      </ElSkeleton>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.changelog-versions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  p {
    margin-right: 2rem;
  }
}
.changelog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .changelog-meta {
    display: flex;
    flex: 1;
    flex-direction: column;
    p {
      margin: 0;
    }
  }

  .link-item {
    line-height: 1.7;
  }
}
</style>
