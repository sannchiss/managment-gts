<template>
    <company-component />
</template>

<script>
export default {

    components: {
        "company-component": require("@/components/company/CompanyComponent.vue").default
    }

}
</script>