DATABASE<% print(index) %> = {
<%
print(
    _.map(sorted.slice(index * 40000, (index + 1) * 40000), function(account) {
        return `    ["${account.login}"] = {`+ _.map(account.persons, function(person) {
            return `{"${person.name}", ${person.lvl}, ${person.gs}, ${person.race}, "${person.guild}", ${person.class}}`
        }).join(',') +'}'
    })

    .join(`,\r\n`))
%>
}