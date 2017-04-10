select strftime('%s', 'now');
select firstname, strftime('%m', birthdate) from students;

SELECT * FROM Students where strftime('%m', birthdate) = strftime('%m', 'now');

select firstname, lastname, strftime('%m%d', birthdate) as d from students order by d asc;
