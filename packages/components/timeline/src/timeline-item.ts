import {  iconPropType } from 'utils'
import type { ExtractPropTypes } from 'vue'
import type TimelineItem from './timeline-item.vue'

export const timelineItemProps = {
  timestamp: {
    type: String,
    default: '',
  },
  hideTimestamp: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: false,
  },
  placement: {
    type: String,
    default: 'bottom',
  },
  type: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'normal',
  },
  icon: {
    type: iconPropType,
    default: '',
  },
  hollow: {
    type: Boolean,
    default: false,
  },
}
export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>

export type TimelineItemInstance = InstanceType<typeof TimelineItem>
