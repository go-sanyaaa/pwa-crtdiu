import moment from "moment"
import {mapState} from "vuex";
import {FETCH_MY_EVENTS} from "../../store/actions.type";

export const loadMyEvents = {
    created(){
        if(this.isAuthenticated) this.getMyEvents()
    },
    data(){
        return {
            myEventsLoading: true
        }
    },
    computed: {
        ...mapState('auth',['isAuthenticated']),
    },
    methods: {
        getMyEvents(){
            this.$store.dispatch(`events/${FETCH_MY_EVENTS}`)
                .then(resp => {
                    this.myEventsLoading = false
                })
                .catch(err => {
                    this.myEventsLoading = false
                })
        },
    }
}

export const checkEvent = {
    computed: {
        completed(){
            return moment().isAfter(this.event.event_date_end)
        }
    }
}