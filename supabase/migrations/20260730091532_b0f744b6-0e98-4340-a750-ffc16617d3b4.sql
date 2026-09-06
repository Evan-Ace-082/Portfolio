
ALTER TABLE public.messages
  ADD CONSTRAINT messages_len CHECK (
    length(name) BETWEEN 1 AND 120 AND
    length(email) BETWEEN 3 AND 255 AND
    length(message) BETWEEN 1 AND 5000 AND
    (subject IS NULL OR length(subject) <= 200) AND
    (phone IS NULL OR length(phone) <= 40)
  );
DROP POLICY "anyone can send message" ON public.messages;
CREATE POLICY "anyone can send message" ON public.messages FOR INSERT
  WITH CHECK (status = 'unread');
