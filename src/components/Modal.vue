<template>
    <!-- Modal -->
    <div class="modal" :id="modalId" :class="modalClass" role="dialog">
        <div class="modal-dialog" :class="modalSize" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" v-text="title"></h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            modalId: {},
            title: {},
            modalSize: {
                default: ''
            },
            modalClass: {}
        }
    };
</script>

<style lang="less">

</style>