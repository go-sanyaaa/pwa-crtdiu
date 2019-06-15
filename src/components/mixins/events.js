import {mapState} from "vuex";
import {FETCH_MY_EVENTS} from "../../store/actions.type";

export const loadMyEvents = {
    created(){
        if(this.isAuthenticated) this.getMyEvents()
    },
    data(){
        return {
            myEventsLoading: true,
            eventsError: false
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
                    this.eventsError = false
                })
                .catch(err => {
                    this.myEventsLoading = false
                    this.eventsError = err
                })
        },
    }
}