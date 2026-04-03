import Pusher from 'pusher-js';
import { onMounted, onUnmounted } from 'vue';

// Pusher credentials matching the Laravel backend
const PUSHER_APP_KEY = '898370f5e4ff05fa6d07';
const PUSHER_CLUSTER = 'ap2';

let pusherInstance = null;

function getPusherInstance() {
    if (!pusherInstance) {
        pusherInstance = new Pusher(PUSHER_APP_KEY, {
            cluster: PUSHER_CLUSTER,
            forceTLS: true,
        });
    }
    return pusherInstance;
}

/**
 * Composable to subscribe to a Pusher channel and bind events.
 *
 * Usage in any Vue component:
 *   const { channel } = usePusher('online-orders', {
 *       'online.order.placed': (data) => { console.log(data); }
 *   });
 *
 * @param {string} channelName  - Pusher channel name
 * @param {Object} events       - Map of event name => handler function
 */
export function usePusher(channelName, events = {}) {
    const pusher = getPusherInstance();
    let channel = null;

    onMounted(() => {
        channel = pusher.subscribe(channelName);

        for (const [eventName, handler] of Object.entries(events)) {
            channel.bind(eventName, handler);
        }
    });

    onUnmounted(() => {
        if (channel) {
            for (const eventName of Object.keys(events)) {
                channel.unbind(eventName);
            }
            pusher.unsubscribe(channelName);
            channel = null;
        }
    });

    return { pusher, channel };
}
