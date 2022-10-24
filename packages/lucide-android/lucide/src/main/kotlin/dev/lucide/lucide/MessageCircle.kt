package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.MessageCircle: ImageVector
    get() {
        if (_messageCircle != null) {
            return _messageCircle!!
        }
        _messageCircle = Builder(name = "MessageCircle", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(21.0f, 11.5f)
                arcToRelative(8.38f, 8.38f, 0.0f, false, true, -0.9f, 3.8f)
                arcToRelative(8.5f, 8.5f, 0.0f, false, true, -7.6f, 4.7f)
                arcToRelative(8.38f, 8.38f, 0.0f, false, true, -3.8f, -0.9f)
                lineTo(3.0f, 21.0f)
                lineToRelative(1.9f, -5.7f)
                arcToRelative(8.38f, 8.38f, 0.0f, false, true, -0.9f, -3.8f)
                arcToRelative(8.5f, 8.5f, 0.0f, false, true, 4.7f, -7.6f)
                arcToRelative(8.38f, 8.38f, 0.0f, false, true, 3.8f, -0.9f)
                horizontalLineToRelative(0.5f)
                arcToRelative(8.48f, 8.48f, 0.0f, false, true, 8.0f, 8.0f)
                verticalLineToRelative(0.5f)
                close()
            }
        }
        .build()
        return _messageCircle!!
    }

private var _messageCircle: ImageVector? = null
